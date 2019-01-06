/*
we are using 'Socket.io' library for websocket communicate between the client and
server. we are going to use Nodejs as a server side. For this you have to some
understand about Nodejs

 step by step :
   1. run the packagejson to initialize repository versions that we are using.
         $ npm init
      //entry point: (index.js) - this is kickoff point of the application
      //                        -we will save file as 'index.js'.

   2. to install express
         $ npm install express -save

   3. ?? chech the connection between 'var express' vs 'app=express()'

   4. make middleware to catch the static files (inside public folder)
      app.use(express.static('./public'));

  5. make html file as 'index.html' it will automatically set default static
     file. because of 'index' keyword.

  6. then create the css file (just copy-past)

  7.  install Socket.io bothside (server side + client side)
       i) install Socket.io on server side.
           $ npm install socket.io -save
      ii) import 'socket.io'
            var socket =require('socket.io');
     iii) include the server-listen to socket
             var io=socket(server);
      iv) set event to above 'io' variable to fire  when made a socket connection established
              io.on('connection',function(socket){
                console.log('made socket connection');
              });

   8. setup Socket.io on client inside.
           https://socket.io/  and copy the xxx/socket.io.js CDN as source script file to index.js
      and make connection on client javascript file too
           >var socket = io.connect('http://localhost:4000');

   9. next edit the html and javascript file to massenger interface.
      i) inhdex.html client  file
               <body>
                  <div id='mario-chat'>
                      <div id='chat-window'>
                          <div id='output'> </div>
                      </div>
                      <input id="handle" type="text" placeholder="Handle" />
                      <input id="message" type="text" placeholder="Message"/>
                      <button id="send">Send</button>
                  </div>



                  <script src='/chat.js'></script>
               </body>

    ii) chat.js client file.
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

  10. when client send some massage data to server emit name 'chat' then that
      data must send all to socket users connections .

        socket.on('chat',function(data){ // data = client js sending object data
          io.sockets.emit('chat',data); // call all client and say there have 'chat' data

        });
  11. when server send massage data to all users socket then that massage should mannage
      by client side.

      // Listen for events 'chat' from the server
      socket.on('chat',function(data){
        output.innerHTML +='<p><strong>'+data.handle+'</strong>'+data.message+'</p>';
      });

  12. optional we can try 'broadcast the message'
      i) one user send the message to server and server send message to all sockets
          connections include the message sender.(we already did)
               socket.emit('chat',data);
    ii)  one user send the message to server and server send message to all sockets
         connections except the message sender. (now let's see)
               socket.broadcast.emit('typing',data);

*/

var express=require('express');
var socket =require('socket.io');

// App steup
var app=express();
// middleware to static file
app.use(express.static('./public'));






var server=app.listen(4000,function(){
  console.log('listening to request on port 4000');
});

// Socket setup
var io=socket(server);

// set event to above 'io' variable to fire  when made a socket connection
io.on('connection',function(socket){
  console.log('made socket connection ',socket.id);
  // eachtime when you are connecting(reload,change browser,..) then you are getting
  // -different socket connections
  socket.on('chat',function(data){ // data = client js sending object data
    io.sockets.emit('chat',data); // call all client and say there have 'chat' data

  });


});
