module.exports = ({ env }) => {
  const enableCustomSecurity = env("ENABLE_CUSTOM_SECURITY", "false") === "true"; // Check if custom security is enabled

  return [
    'strapi::logger',
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          // Always apply the second contentSecurityPolicy
          directives: {
            'script-src': ["'self'", "editor.unlayer.com", 'unsafe-inline', 'https://maps.googleapis.com'],
            'frame-src': ["'self'", "editor.unlayer.com"],
            'media-src': [
              "'self'",
              'blob:',
              'data:',
              'https://maps.gstatic.com',
              'https://maps.googleapis.com',
            ],
            'img-src': [
              "'self'",
              'data:',
              'market-assets.strapi.io',
              'cdn.jsdelivr.net',
              'strapi.io',
              's3.amazonaws.com',
              'https://maps.gstatic.com',
              'https://maps.googleapis.com',
              'khmdb0.google.com',
              'khmdb0.googleapis.com',
              'khmdb1.google.com',
              'khmdb1.googleapis.com',
              'khm.google.com',
              'khm.googleapis.com',
              'khm0.google.com',
              'khm0.googleapis.com',
              'khm1.google.com',
              'khm1.googleapis.com',
              'khms0.google.com',
              'khms0.googleapis.com',
              'khms1.google.com',
              'khms1.googleapis.com',
              'khms2.google.com',
              'khms2.googleapis.com',
              'khms3.google.com',
              'khms3.googleapis.com',
              'streetviewpixels-pa.googleapis.com',
            ],
            // Conditionally add the first contentSecurityPolicy if custom security is enabled
            ...(enableCustomSecurity && {
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
            }),
          },
        },
      },
    },
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
