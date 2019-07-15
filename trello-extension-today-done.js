/**
* @param context {WebtaskContext}
*/
const axios = require('axios');
const express = require('express');
const app = express();
const Webtask    = require('webtask-tools');

axios.defaults.baseURL = 'https://api.trello.com/1/';

// function
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

const getCardOfList = function(listId, token, key) {
  return axios
          .get(`lists/${listId}/cards?token=${token}&key=${key}`)
          .then(function (response) {
            return response.data
          })
          .catch(function () {
            return null
          })
}

const moveCardToList = function(cardId, listId, token, key) {
  return axios
          .put(`cards/${cardId}?idList=${listId}&token=${token}&key=${key}`)
          .then(function (response) {
            return response.data
          })
          .catch(function () {
            return null
          })
}


// controllers
const moveAllListCardsToList = function (req, res) {
  const token = req.webtaskContext.secrets.token;
  const key = req.webtaskContext.secrets.key;
  const fromListId = req.params.srcId;
  const toListId = req.params.destId;
  getCardOfList(fromListId, token, key)
    .then(function (data) {
      const cards = data.map(function (card) {
        return card.id
      });
      res.json(cards)
    })
    .catch(function () {
      res.sendStatus(404)
    })
}

// routes
app.get('/list/:srcId/list/:destId', moveAllListCardsToList);

module.exports = Webtask.fromExpress(app);