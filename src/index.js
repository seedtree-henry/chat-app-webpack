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
    getPastMessages();
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

    storageEmail = email;
    
    getPastMessages();

    messageDivTag.style.display = "block";
    emailDivTag.style.display = "none";
}

function submitMessage(event) {
    event.preventDefault();
    var message = messageInputTag.value;

    var data = {
        email: storageEmail,
        message: message
    };

    socket.emit("newMessage", data);

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
    console.log(data);
    var messageTag = document.createElement("li");
    var email = data.email;
    var message = data.message;

    messageTag.innerHTML = `${email}: ${message}`;
    messageTag.classList.add("message-others");
    messagesUlTag.appendChild(messageTag);

    messageInputTag.value = "";
}

function getPastMessages() {
    fetch("http://localhost:5220/messages")
        .then(function(res) {
            return res.json();
        })
        .then(function(messages) {
            for(var i = 0; i < messages.length; i++) {
                var messageTag = document.createElement("li");
                var email = messages[i].email;
                var message = messages[i].message;

                messageTag.innerHTML = `${email}: ${message}`;
                if (storageEmail == email) {
                    messageTag.classList.add("message-mine");
                } else {
                    messageTag.classList.add("message-others");
                }
                
                messagesUlTag.appendChild(messageTag);
            }
        })
}