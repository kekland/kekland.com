const axios = require('axios').default;

module.exports = async () => {
  strapi.log.debug('Music: Starting');

  try {
    const apiKey = strapi.config.get('server.lastFm.apiKey');
    const username = strapi.config.get('server.lastFm.username');

    const { data } = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=10`
    );

    await strapi.query('scrobbles').delete();
    await strapi.connections.default.raw('UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME="scrobbles"');

    for (const scrobble of data.recenttracks.track) {
      const artist = scrobble.artist['#text'];
      const nowPlaying = scrobble['@attr'] ?
        scrobble['@attr'].nowplaying : false;

      const name = scrobble.name;
      const albumName = scrobble.album['#text'];

      const imageUrl = scrobble.image[2]['#text'];
      const url = scrobble.url;

      const date = scrobble.date ? scrobble.date.uts : null;

      const result = {
        artist,
        track: name,
        imageUrl,
        album: albumName,
        isListening: nowPlaying === 'true',
        url,
        listenedAt: date ? new Date(parseInt(date) * 1000) : null,
      };

      await strapi.query('scrobbles').create(result);
    }

    strapi.log.debug(`Music: Finished, added ${data.recenttracks.track.length} scrobbles`);
  }
  catch (e) {
    strapi.log.error('Music: Failed', e);
  }
};
