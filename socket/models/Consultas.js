const Conexao = require('../../models/Conexao')
const ExecQuery = require('../../models/ExecQuery')
const ComparaObjetos = require('./ComparaObjetos')

class Consultas {
  
  constructor (io, rotaSocket, loja, query) {
    this.io = io
    this.rotaSocket = rotaSocket
    this.loja = loja
    this.query = query
    this.ultimaConsulta = []
    this.respSql
    this.consultaDados()
  }

  _setUltimaConsulta (respSql) {
    this.ultimaConsulta = respSql
  }

  _setRespSql (respSql) {
    this.respSql = respSql
  }

  _hasUltimaConsulta () {
    if (this.ultimaConsulta.length) return true
    else return false
  }

  _mudou () {
    if (ComparaObjetos.mudou(this.ultimaConsulta, this.respSql)) {
      this.ultimaConsulta = this.respSql
      this.io.to(`${this.loja}`).emit(this.rotaSocket, this.respSql)
  
    }
    this.consultaDados(this.query)
  }

  async consultaDados () {

    let conexao = await new Conexao().consincoTst()
    let res = await new ExecQuery().execute(conexao, this.query)

    if (!this._hasUltimaConsulta() && res !== false) {
      this._setUltimaConsulta(res)
      this.io.to(`${this.loja}`).emit(this.rotaSocket, res)
      this.consultaDados(this.query)

    } else if (res !== false) {
      this._setRespSql(res)
      this._mudou()

    }
  }
}

module.exports = Consultas