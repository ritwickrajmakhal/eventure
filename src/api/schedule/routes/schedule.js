'use strict';

/**
 * schedule router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::schedule.schedule');
