import io from 'socket.io-client';
const socket = io.connect(' http://652f4185.ngrok.io');

module.exports = socket;
