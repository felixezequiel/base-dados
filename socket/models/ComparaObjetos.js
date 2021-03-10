module.exports = {
  mudou: (ultimaConsulta, respSql) => {

    let atualizar = false

    ultimaConsulta.forEach((obj, indice) => {
      let keys = Object.keys(obj)
      keys.forEach(key => {
        if (obj[key] !== respSql[indice][key]) {
          atualizar = true
        }
      })

    })

    return atualizar
  }
}