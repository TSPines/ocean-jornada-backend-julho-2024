const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

//Desafio: criar endpoint /oi que exibe "Olá, mundo!
app.get('/oi', function (req, res){
  res.send('Olá, mundo!')
})

// Lista de Personagens
const lista = ['Rick Sanchez','Morty Smith','Summer Smith']

// Read All - [GET] / item
app.get('/item', function(req,res){
  //Pegamos a lista e enviamos como reposta HTTP
  res.send(lista)

} )

//sinalizamos para o Express que vamos usar JASON no Body
app.use(express.json())

// Create - [POST] /item
app.post('/item', function (req,res) {
  const item = req.body.nome
    lista.push(item)
    
    res.send('Item criado com sucesso!')
})

// Read by Id - [GET] /item/:id
app.get('/item/:id', function (req, res){
  //Acessamos o parametro de rota ID
  const id = req.params.id

  //Acessamos o item na lista pelo índice corrigido
  const item = lista[id - 1]

  //enviamos o item obtido como resposta
  res.send(item)
})

app.listen(3000)