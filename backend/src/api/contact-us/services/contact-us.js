"use strict";

/**
 * contact-us service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::contact-us.contact-us",
  ({ strapi }) => ({
    async create(params) {
      const result = await super.create(params);

      // logic to send email to the user
      await strapi
        .plugin("email")
        .service("email")
        .send({
          from: process.env.EMAIL_SERVICE_ADDRESS,
          to: [
            {
              address: result.email,
              displayName: result.email.split("@")[0],
            },
          ],
          subject: "Thank you for contacting Eventure!",
          html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <div style="background-color: #f7f7f7; padding: 20px;">
                <h2 style="color: #0056b3;">Dear ${
                  result.email.split("@")[0]
                },</h2>
                <p style="font-size: 16px;">Thank you for reaching out to <strong>Eventure</strong>. We're excited to hear from you and appreciate your interest in our event management services!</p>
                
                <p style="font-size: 16px;">We've received your message and will get back to you shortly. Below is a summary of your inquiry:</p>
                
                <div style="background-color: #f0f0f0; padding: 10px; border-radius: 8px;">
                  <p><strong>Subject:</strong> ${result.subject}</p>
                  <p><strong>Message:</strong> ${result.message}</p>
                </div>

                <p style="font-size: 16px;">In the meantime, feel free to visit our website or contact us directly if you have any further questions.</p>

                <p style="font-size: 16px;">Best regards,</p>
                <p style="font-size: 16px; font-weight: bold;">The Eventure Team</p>
              </div>
              
              <footer style="margin-top: 20px; padding: 10px; background-color: #0056b3; color: white; text-align: center;">
                <p>Visit us: <a href="${
                  process.env.FRONTEND_URL
                }" style="color: #ffcc00;">${process.env.FRONTEND_URL}</a></p>
                <p>Follow us on social media for updates and event inspiration!</p>
              </footer>
            </div>
          `,
        });
      return result;
    },
  })
);
