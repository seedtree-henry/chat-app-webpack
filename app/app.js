// Backend

// Node JS includes http and path by default.

var http = require("http");
var path = require("path");

// Express framework / socketIO module

var express = require("express");
var socketIO = require("socket.io");

// mongoDB : https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

var mongoose = require('mongoose');

var mongoDB = 'mongodb://henry:abc1234@ds121183.mlab.com:21183/chatapp-03-10';
mongoose.connect(mongoDB);

var db = mongoose.connection;

db.on("error", function() {
    console.log('MongoDB connection error');
})

// schema : shape of model, not a table

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    email: String,
    message: String
});

// Compile model from schema (a table)

var Message = mongoose.model("Message", MessageSchema);

// create an app and server

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// cors

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);


// root path /

app.get("/", function(req, res) {
    res.send("<h1>Real Time Chat - Backend</h1>")
})

// '/messages' page : json format  
    // localhost:5220/messages

app.get("/messages", messagesInJSON);

function messagesInJSON(req, res) {
    Message.find({}, function (err, messages) {
        if (err) {
            res.json(error);
        } else {
            res.json(messages);
        }
    })
}


// Listen on someone entering the socket 

io.on("connection", handleConnection);

function handleConnection(socket) {
    console.log(socket.id);

    socket.on("newMessage", function(data) {
        // console.log(data);
        Message.create({
            email: data.email,
            message: data.message
        })

        socket.broadcast.emit("passMessage", data);
    })
}

// listen on port 5220

server.listen(5220, function() {
    console.log(`Listening on port 5220.`);
})

