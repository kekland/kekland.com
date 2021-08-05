module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://cms.kekland.com',
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'bbca155a2dd0b4378b4f56292c508f78'),
    },
  },
});
