const Query = require('../models/Query')
const io = require('../config/custon-express')()[1]
const Consultas = require('./models/Consultas')

module.exports = () => {
  io.on('connection', socket => {
    socket.on('loja', data => {
  
      socket.join(data.EMPRESA)
      new Consultas(io, 'pedidos', data.EMPRESA, new Query().consultaPedidos(data.EMPRESA))
    })
  })
}