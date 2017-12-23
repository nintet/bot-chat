// Keep scroll at bottom
function updateScroll(){
    var element = document.getElementById('chat-window');
    element.scrollTop = element.scrollHeight;
}

// Make connection
var socket = io.connect();

// Query DOM
var message = document.getElementById('message')
var handle = document.getElementById('handle')
var btn = document.getElementById('send')
var output = document.getElementById('output')
      
// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  })
})

// Listen for events
socket.on('chat', function(data) {
  output.innerHTML += '<p><strong>' +data.handle+ ':</strong> ' +data.message+ '</p>'
  updateScroll();
})

socket.on('bot', function(data) {
  output.innerHTML += '<p>Bot: ' +data+ '</p>';
  updateScroll();
})