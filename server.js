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

server.listen(3000);