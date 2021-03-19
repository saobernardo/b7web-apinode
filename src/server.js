require("dotenv").config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express(); //Criação de servidor
server.use(cors()); //Requisição de api
server.use(bodyParser.urlencoded({extended:false})); //Popula req.body com content-type correto

server.get('/ping', (req, res) => {
    res.json({pong:true})
});

server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost/${process.env.PORT}`);
}); //Iniciar ouvindo porta definida