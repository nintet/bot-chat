var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function() {
  console.log('Listening to requests on port 4000');
});

// Questions
if (process.env.NODE_ENV === 'production') {
  var trivia = require('./trivia.json')
} else {
  var trivia = [{
    "question": "What is the Spanish word for money?",
    "answer": "Dinero"
  }]
}

setInterval(function() {
  var rtrivia = trivia[Math.floor(Math.random() * trivia.length)];
  rquestion = rtrivia.question
  ranswer = rtrivia.answer.toLowerCase();
  console.log(rquestion+ ' ' +ranswer)
  io.sockets.emit('bot', rquestion)
}, 3000);

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket) {
  console.log('Socket connected:', socket.id);
  
  socket.on('chat', function(data) {
    io.sockets.emit('chat', data);
    if (data.message.toLowerCase().indexOf(ranswer) != -1){
      io.sockets.emit('bot', 'Correct')
    }
  });
  
});

