
const express = require('express')
const { MongoClient, ConnectionPoolReadyEvent } = require('mongodb')
const app = express()

const dbUrl = 'mongodb+srv://admin:KuNKeucE96KNkuLi@cluster0.kqsrql1.mongodb.net'
const dbName = 'ocean-jornada-backend'

const cliente = new MongoClient(dbUrl)

async function main() {

  console.log('Conectando ao banco de dados...')
  await cliente.connect()
  console.log('Banco de dados conectado com sucesso!')

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  //Desafio: criar endpoint /oi que exibe "Olá, mundo!
  app.get('/oi', function (req, res) {
    res.send('Olá, mundo!')
  })

  // Lista de Personagens
  const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

  const db = cliente.db(dbName)
  const collection = db.collection('item')

  // Read All - [GET] / item
  app.get('/item', async function (req, res) {    
    //Obter todos os docmentos da collection
    const documentos = await collection.find().toArray()

    // Pegamos os documentos e enviamos como resposta HTTP
    res.send(documentos)

     })

  //sinalizamos para o Express que vamos usar JASON no Body
  app.use(express.json())

  // Create - [POST] /item
  app.post('/item', function (req, res) {
    const item = req.body.nome
    lista.push(item)

    res.send('Item criado com sucesso!')
  })

  // Read by Id - [GET] /item/:id
  app.get('/item/:id', function (req, res) {
    //Acessamos o parametro de rota ID
    const id = req.params.id

    //Acessamos o item na lista pelo índice corrigido
    const item = lista[id - 1]

    //enviamos o item obtido como resposta
    res.send(item)
  })

  //Update - [PUT] /item/:id
  app.put('/item/:id', function (req, res) {
    //Acessamos o ID do parametro de rota
    const id = req.params.id

    //Acessamos o body da requisição, com os dados a serem atualizados
    const novoItem = req.body.nome

    //Atualizamos esse novoItem da lista, usando o Indice
    lista[id - 1] = novoItem

    //Enviamos uma mensagem de sucesso
    res.send('Item atualizado com sucesso: ' + id)
  })


  app.listen(3000)
}

main()