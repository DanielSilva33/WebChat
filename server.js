const express = require('express')
const path = require('path')

const app = express();
const server = require('http').createServer(app); //criando os protocolos http e web socket
const io = require('socket.io')(server); //criando protocolo web socket

app.use(express.static(path.join(__dirname, 'public'))); //definindo pasta para guardar arquivos publicos do projeto como o front-end da aplicação
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) =>{
    res.render('index.html')
});

let messages = []; //arrays de mensagens 

io.on('connection', socket =>{ //conectando um socket no server com um ID especifico 
    console.log(`Socket conectad: ${socket.id}`);

    socket.emit('previousMessages', messages); //para novos clientes conectados receberem as msg ja enviadas por outros clientes

    socket.on('sendMessage', data =>{
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});

server.listen(3000);