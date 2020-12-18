const express = require('express');
const socket = require('socket.io');
const path = require('path');

// Server setup
const PORT = process.env.PORT || 4000;
const app = express();
const server = app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Socket setup
const io = socket(server);

io.on('connection', (socket) => {
	socket.on('message', (message) => {
		io.sockets.emit('message', message);
	});
});
