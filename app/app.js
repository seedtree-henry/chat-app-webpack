// Backend

// Node JS includes http and path by default.

var http = require("http");
var path = require("path");

// Express framework

var express = require("express");

// create an app and server

var app = express();
var server = http.createServer(app);

// root path /

app.get("/", function(req, res) {
    res.send("<h1>Real Time Chat - Backend</h1>")
})

// listen on port 5220

server.listen(5220, function() {
    console.log(`Listening on port 5220.`);
})

