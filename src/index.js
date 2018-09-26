require("./styles.css");

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

    // add my message (li element)
    var messageTag = document.createElement("li");
    messageTag.innerHTML = message;
    messageTag.classList.add("message-mine");
    messagesUlTag.appendChild(messageTag);

    messageInputTag.value = "";
}

socket.on("passMessage", getMessage);

function getMessage(data) {
    // add a message from others (li element)
    var messageTag = document.createElement("li");
    var message = data;

    messageTag.innerHTML = message;
    messageTag.classList.add("message-others");
    messagesUlTag.appendChild(messageTag);

    messageInputTag.value = "";
}