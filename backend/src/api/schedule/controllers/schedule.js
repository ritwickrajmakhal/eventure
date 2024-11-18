'use strict';

/**
 * schedule controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::schedule.schedule');
