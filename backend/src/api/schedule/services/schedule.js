'use strict';

/**
 * schedule service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::schedule.schedule');
