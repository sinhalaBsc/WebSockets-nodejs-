
// Make connection

var socket = io.connect('http://localhost:4000');

// Query DOM
var message =document.getElementById("message");
var Handle =document.getElementById("handle");
var btn =document.getElementById("send");
var output =document.getElementById("output");


// Emit event
btn.addEventListener('click',function(){
  socket.emit('chat',{
    message:message.value,
    handle:handle.value
  });
});

// Listen for events 'chat' from the server
socket.on('chat',function(data){
  output.innerHTML +='<p><strong>'+data.handle+':</strong>'+data.message+'</p>';
});
