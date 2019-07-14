/**
* @param context {WebtaskContext}
*/
const axios = require('axios');
const express = require('express');
const app = express();
const Webtask    = require('webtask-tools');

app.get('/', function(req, res) {
  
});

module.exports = Webtask.fromExpress(app);