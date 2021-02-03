const express = require ('express')
const app = express();
const http = require('http').Server(app)
const path = require ('path');

const io = require ('socket.io')(http);

// Indico donde se encuentran los archivos estáticos
app.use(express.static(path.resolve(__dirname, 'public')))

io.on('connection', socket => {
    console.log('user connected', socket.id);

    // Para mostrar el mensaje y el usuario que lo envía
    socket.on('chat: message', (data) => {
        io.sockets.emit('chat: message', data)
    })

    // Para mostrar si un usuario esta escribiendo un mensaje
    socket.on('chat: typing', data => {
        socket.broadcast.emit('chat: typing', data)
    })
});

//Levanto el servidor
http.listen(3000, (socket) => {
    console.log('servidor corriendo en el puerto 3000');
})





