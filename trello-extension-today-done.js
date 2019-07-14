/**
* @param context {WebtaskContext}
*/
const axios = require('axios');

module.exports = function(context, cb) {
  cb(null, { hello: context.query.name || 'Anonymous' });
};