var openSocket = require("socket.io-client");
var socket = openSocket("http://localhost:5220");

var messagesUlTag = document.querySelector(".messagesList");
var messageFormTag = document.querySelector(".newMessageForm");
var messageInputTag = messageFormTag.querySelector("input");

messageFormTag.addEventListener("submit", submitMessage);

function submitMessage(event) {
    event.preventDefault();
    var message = messageInputTag.value;
    socket.emit("newMessage", message);
}

socket.on("passMessage", getMessage);

function getMessage(data) {
    console.log(data);
}