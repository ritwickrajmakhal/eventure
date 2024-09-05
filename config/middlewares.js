module.exports = ({ env }) => {
  const enableCustomSecurity = env("ENABLE_CUSTOM_SECURITY", "false") === "true"; // Check if custom security is enabled

  return [
    'strapi::logger',
    'strapi::errors',
    enableCustomSecurity
      ? {
          name: 'strapi::security',
          config: {
            contentSecurityPolicy: {
              useDefaults: true,
              directives: {
                'connect-src': ["'self'", 'https:'],
                'img-src': [
                  "'self'",
                  'data:',
                  'blob:',
                  'dl.airtable.com', // Required for Strapi < 4.10.6, you can remove it otherwise
                  'https://market-assets.strapi.io', // Required for Strapi >= 4.10.6, you can remove it otherwise
                  `https://${env('STORAGE_ACCOUNT')}.blob.core.windows.net`,
                ],
                'media-src': [
                  "'self'",
                  'data:',
                  'blob:',
                  'dl.airtable.com', // Required for Strapi < 4.10.6, you can remove it otherwise
                  `https://${env('STORAGE_ACCOUNT')}.blob.core.windows.net`,
                ],
                upgradeInsecureRequests: null,
              },
            },
          },
        }
      : 'strapi::security',
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
