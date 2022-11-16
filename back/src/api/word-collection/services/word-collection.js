'use strict';

/**
 * word-collection service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::word-collection.word-collection');
