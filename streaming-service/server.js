'use strict';

////
// CONFIGURATION SETTINGS
////
var FETCH_INTERVAL = 5000;
var PRETTY_PRINT_JSON = true;

////
// START
////
var express = require('express');
var http = require('http');
var io = require('socket.io');
var cors = require('cors');
var counter

function getRandomValBetween(min, max, precision) {
  min = min === undefined ? 0 : min;
  max = max === undefined ? 9007199254740992 : max;
  precision = precision === undefined ? 0 : precision;

  var random = Math.random() * (max - min) + min;

  return random.toFixed(precision);
}

function getUTCDate() {
  var now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuote(socket, ticker) {
  var dataObj;

  var quote = {};
  quote.ticker = ticker;
  quote.exchange = 'NASDAQ';
  quote.price = getRandomValBetween(100, 300, 2);
  quote.change = getRandomValBetween(0, 200, 2);
  quote.change_percent = getRandomValBetween(0, 1, 2);
  quote.last_trade_time = getUTCDate();
  quote.dividend = getRandomValBetween(0, 1, 2);
  quote.yield = getRandomValBetween(0, 2, 2);

  socket.emit(ticker, PRETTY_PRINT_JSON ? JSON.stringify(quote, null, 4) : JSON.stringify(quote));
}

const createTimer = (socket, ticker, interval) => {
  // every N seconds
  let timer = setInterval(function() {
    getQuote(socket, ticker);
  }, interval || FETCH_INTERVAL);
  return timer
}

function trackTicker(socket, ticker, interval) {

  clearInterval(counter);
  // run the first time immediately
  getQuote(socket, ticker);

  counter = createTimer(socket, ticker, interval)
}

var app = express();
app.use(cors());
var server = http.createServer(app);

var io = io.listen(server);
io.set('origins', '*:*');

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.on('ticker', function(ticker) {
    trackTicker(socket, ticker);
  });

  socket.on('CHANGE_INTERVAL', ({ticker, interval}) => {
    trackTicker(socket, ticker, interval)
  })

  socket.on('disconnect', function() {
    clearInterval(counter);
  });

});

server.listen(process.env.PORT || 4000);
