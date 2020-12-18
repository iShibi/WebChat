const socket = io.connect();

// on clicking the send button
const sendButton = document.getElementById('send-button');
sendButton.addEventListener('mousedown', () => {
	const messageField = document.getElementById('message-bar');
	emitMessageToClients(messageField.value);
	messageField.value = '';
});

// on pressing enter key
document.addEventListener('keydown', (event) => {
	if (event.code === 'Enter') {
		const messageField = document.getElementById('message-bar');
		emitMessageToClients(messageField.value);
		messageField.value = '';
	}
});

// send message to server
function emitMessageToClients(message) {
	socket.emit('message', message);
}

// listen to the message event coming from the server
socket.on('message', (message) => {
	addMessage(message);
});

// add the message to the dom
function addMessage(message) {
	const newMessageElement = document.createElement('p');
	newMessageElement.innerHTML = message;
	const messageArea = document.getElementsByClassName('message-area');
	messageArea[0].appendChild(newMessageElement);
}
