'use strict';

const sendInvitation = require("../routes/send-invitation");
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/**
 * A set of functions called "actions" for `send-invitation`
 */
// Helper function to get field value regardless of case
const getFieldValueCaseInsensitive = (obj, fieldName) => {
  if (!obj) return '';

  // Find the actual field key that matches the desired field name (case-insensitive)
  const actualKey = Object.keys(obj).find(
    key => key.toLowerCase() === fieldName.toLowerCase()
  );

  // Return the value if found, otherwise return empty string
  return actualKey ? obj[actualKey] : '';
};

module.exports = {
  sendInvitation: async (ctx) => {
    try {
      const { audience, schedules, venue, heading, salutation, body, closing_statement } = ctx.request.body;



      const emailPromises = audience.map(async (participant) => {
        try {
          // Generate a unique QR code for the participant
          const participantData = {
            email: getFieldValueCaseInsensitive(participant, 'email'),
            name: getFieldValueCaseInsensitive(participant, 'name'),
            eventId: ctx.params.id, // Assuming you have the event ID
          };

          // Convert participant data to JSON string
          const qrDataString = JSON.stringify(participantData);

          // Create a unique filename for this QR code
          const qrFileName = `qr-${uuidv4()}.png`;

          // Create the path to the public directory where we'll save the QR code
          // Assuming strapi.dirs.public is available; if not, adjust to your actual public path
          const publicDir = strapi.dirs.public || path.join(process.cwd(), 'public');
          const qrDir = path.join(publicDir, 'qrcodes');

          // Ensure the directory exists
          if (!fs.existsSync(qrDir)) {
            fs.mkdirSync(qrDir, { recursive: true });
          }

          const qrFilePath = path.join(qrDir, qrFileName);

          // Generate QR code and save as file
          await QRCode.toFile(qrFilePath, qrDataString, {
            errorCorrectionLevel: 'H',
            type: 'png',
            margin: 1,
            scale: 8
          });

          // Create the URL to the QR code
          // This assumes your Strapi server is accessible at the same URL as your frontend
          // You may need to adjust this URL based on your deployment setup
          const baseUrl = strapi.config.get('server.url') || 'http://localhost:1337';
          const qrCodeUrl = `${baseUrl}/qrcodes/${qrFileName}`;

          // Log the QR code URL for debugging
          console.log(`Generated QR code at: ${qrCodeUrl}`);

          await strapi
            .plugin('email-designer')
            .service('email')
            .sendTemplatedEmail(
              {
                // required - use participant's email
                to: getFieldValueCaseInsensitive(participant, 'email'),
              },
              {
                // required - Ref ID defined in the template designer (won't change on import)
                templateReferenceId: 1,

                // If provided here will override the template's subject.
                subject: heading || 'Event Invitation',
              },
              {
                // Use actual event data in template variables
                heading: heading || '',
                name: getFieldValueCaseInsensitive(participant, 'name'),
                venue: venue.data.attributes.name || '',
                address: venue.data.attributes.map.address,
                schedules: schedules ? schedules.data.map(schedule => {
                  // Format dates for user-friendly display
                  const startDate = new Date(schedule.attributes.start);
                  const endDate = new Date(schedule.attributes.end);

                  // Format dates (e.g., "May 12, 2025 at 6:30 PM")
                  const formatted_start = startDate.toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'Asia/Kolkata',
                  });

                  const formatted_end = endDate.toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'Asia/Kolkata',
                  });

                  return {
                    ...schedule,
                    formatted_start,
                    formatted_end
                  };
                }) : [],
                salutation: salutation || '',
                body: body || '',
                qr_code_url: qrCodeUrl,
                closing_statement: closing_statement || '',
              }
            );
          return { email: getFieldValueCaseInsensitive(participant, 'email'), success: true };
        } catch (err) {
          strapi.log.debug(`📺 Email error for ${getFieldValueCaseInsensitive(participant, 'email')}: `, err);
          return { email: getFieldValueCaseInsensitive(participant, 'email'), success: false, error: err.message };
        }
      });

      // Wait for all emails to be sent
      const results = await Promise.all(emailPromises);

      // Return successful response with results
      return ctx.send({
        message: 'Invitations sent',
        results
      });

    } catch (err) {
      strapi.log.error('📺 Send invitation error: ', err);
      return ctx.badRequest(null, err);
    }
  }
};
