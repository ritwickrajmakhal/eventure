'use strict';

/**
 * venue service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::venue.venue');
