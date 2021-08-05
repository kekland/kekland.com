module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('URL', ''),
  github: {
    username: env('GITHUB_USERNAME', ''),
  },
  google: {
    clientId: env('GAPI_CLIENT_ID', ''),
    clientSecret: env('GAPI_CLIENT_SECRET', ''),
    redirectUri: env('GAPI_REDIRECT_URI', ''),
    accessToken: env('GAPI_ACCESS_TOKEN', ''),
    refreshToken: env('GAPI_REFRESH_TOKEN', ''),
    albumId: env('GAPI_ALBUM_ID', '')
  },
  instagram: {
    username: env('INST_USERNAME', ''),
    password: env('INST_PASSWORD', ''),
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'bbca155a2dd0b4378b4f56292c508f78'),
    },
  },
  cron: {
    enabled: true,
  },
});
