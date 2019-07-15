/**
* @param context {WebtaskContext}
*/
const axios = require('axios');
const express = require('express');
const app = express();
const Webtask    = require('webtask-tools');

axios.defaults.baseURL = 'https://api.trello.com/1/';

const getBoardLists = function (boardId, token, key) {
  return axios
          .get(`boards/${boardId}/lists?token=${token}&key=${key}`)
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
  getBoardLists(id, token, key)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err)
    })
}

app.get('/cards/:id/', moveAllListCardsToList);

module.exports = Webtask.fromExpress(app);