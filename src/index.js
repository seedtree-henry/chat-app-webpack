require("./styles.css");

var openSocket = require("socket.io-client");
var socket = openSocket("http://localhost:5220");

var emailDivTag = document.querySelector(".emailSection");
var messageDivTag = document.querySelector(".messageSection");

var messagesUlTag = document.querySelector(".messagesList");

var emailFormTag = document.querySelector(".newEmailForm");
var emailInputTag = emailFormTag.querySelector("input");

var messageFormTag = document.querySelector(".newMessageForm");
var messageInputTag = messageFormTag.querySelector("input");

// get email from local storage

var storageEmail = localStorage.getItem("email");

if (storageEmail) {
    // show message form only => hide email section
    emailDivTag.style.display = "none";
} else {
    // show email form => hide message section
    messageDivTag.style.display = "none";
}

emailFormTag.addEventListener("submit", submitEmail);
messageFormTag.addEventListener("submit", submitMessage);

function submitEmail(event) {
    event.preventDefault();
    var email = emailInputTag.value;
    localStorage.setItem("email", email);

    messageDivTag.style.display = "block";
    emailDivTag.style.display = "none";
}

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