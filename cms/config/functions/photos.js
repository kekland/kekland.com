const axios = require('axios');
const { google } = require('googleapis');
const Photos = require('googlephotos');
const Instagram = require('instagram-web-api')

module.exports = async () => {
  strapi.log.debug('GooglePhotos: Starting')
  try {
    const credentials = {
      clientId: strapi.config.get('server.google.clientId'),
      clientSecret: strapi.config.get('server.google.clientSecret'),
      redirectUri: strapi.config.get('server.google.redirectUri'),
    }

    const token = {
      accessToken: strapi.config.get('server.google.accessToken'),
      refreshToken: strapi.config.get('server.google.refreshToken'),
    }

    const scopes = [Photos.Scopes.READ_ONLY, Photos.Scopes.SHARING];

    const oauth2Client = new google.auth.OAuth2(
      credentials.clientId,
      credentials.clientSecret,
      credentials.redirectUri,
    )

    oauth2Client.setCredentials({
      access_token: token.accessToken,
      refresh_token: token.refreshToken,
      scope: scopes.join(' '),
    })

    const refreshResponse = await oauth2Client.refreshAccessToken()
    const newCredentials = refreshResponse.credentials

    const albumId = strapi.config.get('server.google.albumId')
    const photos = new Photos(newCredentials.access_token)

    let responseImages = []
    let pageToken
    while (true) {
      const response = await photos.mediaItems.search(albumId, 100, pageToken)

      responseImages = [...responseImages, ...response.mediaItems]

      if (response.nextPageToken) {
        pageToken = response.nextPageToken
      }
      else {
        break
      }
    }

    let instagramUploads = []
    for (const image of responseImages) {
      const entity = await strapi.query('photo').findOne({ gphotosId: image.id })
      if (!entity) instagramUploads = [...instagramUploads, image]
    }

    await strapi.query('photo').delete()
    await strapi.connections.default.raw(`UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='photos';`)

    for (const image of responseImages) {
      const photoData = {
        gphotosId: image.id,
        thumbnailUrl: `${image.baseUrl}=w500`,
        url: `${image.baseUrl}=w10000`,
        takenAt: Date.parse(image.mediaMetadata.creationTime)
      }

      const entity = await strapi.query('photo').create(photoData)
      image.id = entity.id
    }

    strapi.log.debug(`GooglePhotos: Finished, saved ${responseImages.length} photos`)

    if (instagramUploads.length > 0) {
      strapi.log.debug(`Instagram: Starting ${instagramUploads.length} Instagram uploads`)

      const instagram = new Instagram({
        username: strapi.config.get('server.instagram.username'),
        password: strapi.config.get('server.instagram.password'),
      })

      await instagram.login()

      for (const image of instagramUploads) {
        await instagram.uploadPhoto({
          photo: `${image.baseUrl}=w1080`,
          caption: `https://kekland.com/photo/${image.id}`,
          post: 'feed',
        })
      }

      strapi.log.debug(`Instagram: Finished uploads`)
    }

    return true
  }
  catch (e) {
    strapi.log.error(`GooglePhotos: Failed`, e)
    return false
  }
};
