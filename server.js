//Após pegarmos o nunjuncks podemos setar o motor de visualização que será utilizado
const nunjucks = require('nunjucks')
const express = require('express')
const routes = require('./routes')

const server = express();

//Midllewars
//acessando a pasta que contem os arquivos staticos CSS
server.use(express.urlencoded({ extended: true }))
server.use(express.static('Public'));
server.use(routes);

//Dizendo qual motor será utilizado que nesse caso é a view engine
server.set("view engine", "njk");

//Depois podemos fazer a configuração da rota que ele irá utilizar
//que nesse caso será a pasta views e também dizemos que vamos usar o express e a variavel que 
//estamos utilizando
nunjucks.configure("Views", {
    express: server,
    autoescape: false
});

server.listen(5000, function() {
    console.log('Server is running ')
})