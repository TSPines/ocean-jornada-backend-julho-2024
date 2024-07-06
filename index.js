
const express = require('express')
const { MongoClient, ConnectionPoolReadyEvent, ObjectId } = require('mongodb')
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
    // Acessamos o parametro da rota ID
    const id = req.params.id

    //Obter todos os docmentos da collection
    const item = await collection.findOne({ _id: new Object(id) })

    // Enviamos o item obtido como resposta
    res.send(item)
     })

    //Update - [PUT] /item/:id
    app.put('/item/:id', async function (req, res){
      //Acessamos o ID do parametro de rota
      const id = req.params.id
      //Acessamos o novoItem no body da requisição
      const novoItem = req.body
      //Atualizamos a collection com a nova informação
      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: novoItem}
      )
      //Enviamos uma mensagem de sucesso
      res.send('Item atualizado com sucesso: '+ id)
    })

  // Create - [POST] /item
  app.post('/item', function (req, res) {
    const item = req.body
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


  //Delete [DELETE] /item/:id
  app.delete('/item/:id', async function (req, res) {
    //Acessamos o ID do parametro de rota
    const id = req. params.id

    //Remove o item da collection pelo ObjectId
    await collection.deleteOne({ _id: new ObjectId(id) })

    //Enviamos uma mensagem de sucesso
    res.send('Item removido com sucesso!')
  })

  app.listen(3000)
}

main()