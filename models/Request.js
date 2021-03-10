const ExecQuery = require('./ExecQuery')
class Request {

	resolver(req, res, conexao, query) {
		new ExecQuery().execute(conexao, query)
			.then(resultado => {
				if (resultado) {
					return res.send(resultado)
				} else {
					return res.status(400).json({query: query})
				}
			})
			.catch((erro) => {
				console.log(erro)
				res.status(500).json({erro: erro})
			})
	}
}

module.exports = Request