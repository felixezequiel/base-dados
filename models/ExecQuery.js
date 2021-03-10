const MontaObjeto = require('./MontaObjetos')
class ExecQuery {
	async execute(conexao, query) {
		let result
		try {
			result = await conexao.execute(query)
			if(query.match(/BEGIN/)) {result = true}
		}
		catch (erro) {
			console.log(`${new Date()} = falhou em /infra/exec/execQuery.js execute => {...}\n
                executando a query:\n
                ${query}\n\n${erro}\n\n`)
		}
		finally {
			conexao.close()
			if (!result) return false
			if (result.rowsAffected >= 1) return true
			if(result === true) return true
			else if (result.rows != '') {
				let resultadoConsulta = new MontaObjeto().construir(result)
				return resultadoConsulta
			} else {
				return false
			}
		}
	}
}

module.exports = ExecQuery