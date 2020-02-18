const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');

const app = express()
const server = http.createServer(app) //io requires raw http
const io = socketio(server)

const DATA_SOCKET_PORT = process.argv[2] || 3003

io.on('connection', socket =>{
    socket.broadcast.emit("sendData", { name: 'Anonymous', message: 'A NEW USER HAS JOINED' })
    socket.on('sendData', message => {
        io.emit('showData', message)
    })
})

server.listen(DATA_SOCKET_PORT, () => {
    console.info(`Server running at ${DATA_SOCKET_PORT}`);
})