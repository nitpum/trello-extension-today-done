/**
* @param context {WebtaskContext}
*/
const axios = require('axios');
const express = require('express');
const app = express();
const Webtask    = require('webtask-tools');

axios.defaults.baseURL = 'https://api.trello.com/1/';

const getBoardLists = function (boardId) {
  return axios
          .get(`boards/${id}/lists?token=${token}&key=${key}`)
          .then(function (response) {
            return response.data
          })
          .catch(function () {
            return null
          })
}

const moveAllListCardsToList = function (req, res) {
  const token = req.webtaskContext.secrets.token;
  const key = req.webtaskContext.secrets.key;
  const id = req.params.id;
  getBoardLists()
    .then(function (data) {
      res.sendJson(data);
    })
}

app.get('/cards/:id/', moveAllListCardsToList);

module.exports = Webtask.fromExpress(app);