'use strict';

/**
 * navbar service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::navbar.navbar');
