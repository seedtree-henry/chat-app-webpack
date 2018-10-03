// Backend

// Node JS includes http and path by default.

var http = require("http");
var path = require("path");

// Express framework / socketIO module

var express = require("express");
var socketIO = require("socket.io");

// create an app and server

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// root path /

app.get("/", function(req, res) {
    res.send("<h1>Real Time Chat - Backend</h1>")
})

// Listen on someone entering the socket 

io.on("connection", handleConnection);

function handleConnection(socket) {
    console.log(socket.id);

    socket.on("newMessage", function(data) {
        // console.log(data);
        socket.broadcast.emit("passMessage", data);
    })
}

// listen on port 5220

server.listen(5220, function() {
    console.log(`Listening on port 5220.`);
})

