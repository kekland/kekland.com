const axios = require('axios').default;

module.exports = async () => {
  strapi.log.debug('Music: Starting');

  try {
    const apiKey = strapi.config.get('server.lastFm.apiKey');
    const username = strapi.config.get('server.lastFm.username');

    const { data } = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
    );


    const lastTrack = data.recenttracks.track[0];
    const artist = lastTrack.artist['#text'];
    const nowPlaying = lastTrack['@attr'] ?
      lastTrack['@attr'].nowplaying : false;

    const name = lastTrack.name;
    const albumName = lastTrack.album['#text'];

    const imageUrl = lastTrack.image[2]['#text'];
    const url = lastTrack.url;

    const date = lastTrack.date ? lastTrack.date.uts : null;

    const result = {
      artist,
      track: name,
      imageUrl,
      albumName,
      nowPlaying: nowPlaying === 'true',
      url,
      playedAt: date ? new Date(parseInt(date) * 1000) : null,
    };

    await strapi.services['last-playing'].createOrUpdate(result);
    strapi.log.debug('Music: Finished');
  }
  catch (e) {
    strapi.log.error('Music: Failed', e);
  }
};
