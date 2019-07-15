/**
* @param context {WebtaskContext}
*/
const axios = require('axios');
const express = require('express');
const app = express();
const Webtask    = require('webtask-tools');

axios.defaults.baseURL = 'https://api.trello.com/1/';

// function
async function getBoardLists(boardId, token, key) {
  return axios
          .get(`boards/${boardId}/lists?token=${token}&key=${key}`)
          .then(function (response) {
            return response.data
          })
          .catch(function () {
            return null
          })
}

async function getCardOfList(listId, token, key) {
  return axios
          .get(`lists/${listId}/cards?token=${token}&key=${key}`)
          .then(function (response) {
            return response.data
          })
          .catch(function () {
            return null
          })
}

async function moveCardToList(cardId, listId, token, key) {
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
async function moveAllListCardsToList (req, res) {
  const token = req.webtaskContext.secrets.token;
  const key = req.webtaskContext.secrets.key;
  const fromListId = req.params.srcId;
  const toListId = req.params.destId;
  getCardOfList(fromListId, token, key)
    .then(function (data) {
      const cards = data.map(card => card.id);
      // for(var cardId in cards) {
      //   moveCardToList(cardId, toListId, token, key);
      // }
      res.json(cards)
    })
    .catch(function () {
      res.sendStatus(404)
    })
}

// routes
app.get('/list/:srcId/list/:destId', amoveAllListCardsToList);

module.exports = Webtask.fromExpress(app);