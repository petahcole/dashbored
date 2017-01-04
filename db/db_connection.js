var environment = process.env.DEV_DATABASE_URL || 'development';
var config = require('../knexfile.js')[production];
module.exports = require('knex')(config);
