'use strict';

/**
 * contact-us service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::contact-us.contact-us');
