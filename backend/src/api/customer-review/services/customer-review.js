'use strict';

/**
 * customer-review service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::customer-review.customer-review');
