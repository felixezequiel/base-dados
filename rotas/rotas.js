const Conexao = require('../models/Conexao')
const Request = require('../models/Request')
const Query = require('../models/Query')

module.exports = (app) => {
	app.post('/api/db/separacao-ecommerce/usuario', (req, res) => {
		new Conexao().consincoTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().consultaUsuario(req.body.usuario, req.body.senha, 'L'))
		})
	})
	app.post('/api/db/separacao-ecommerce/usuario-sac', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().consultaUsuario(req.body.usuario, req.body.senha, 'S'))
		})
	})
	app.post('/api/db/separacao-ecommerce/pedidos', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().consultaPedidos(req.body.loja))
		})
	})
	app.post('/api/db/separacao-ecommerce/detalha-pedido', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().detalhaPedido(req.body.pedido, req.body.loja))
		})
	})
	app.post('/api/db/separacao-ecommerce/cod-barras', (req, res) => {
		new Conexao().consincoTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().codBarrasPedido(req.body.codProduto))
		})
	})
	app.post('/api/db/separacao-ecommerce/descricao', (req, res) => {
		new Conexao().consincoTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().consultaDescricao(req.body.codigos, req.body.loja))
		})
	})
	app.post('/api/db/separacao-ecommerce/pendentes', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().consultaPedidosPendentes(req.body.loja))
		})
	})
	app.post('/api/db/separacao-ecommerce/atualiza-cabecalho', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().atualizaStatusCabecalho(req.body))
		})
	})
	app.post('/api/db/separacao-ecommerce/atualiza-qtdAtendida', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().atualizaQtdAtendida(req.body))
		})
	})
	app.get('/api/db/separacao-ecommerce/monitoramento-troca', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().consultaMonitoramentoTroca())
		})
	})
	app.post('/api/db/separacao-ecommerce/detalhes-troca', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().consultaDetalhesTroca(req.body.nroPedido, req.body.loja))
		})
	})
	app.post('/api/db/separacao-ecommerce/atualiza-tempo', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().atualizaTempoPercorrido(req.body))
		})
	})
	app.post('/api/db/separacao-ecommerce/valida-aceite', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().validarAceite(req.body))
		})
	})
	app.post('/api/db/separacao-ecommerce/efetuar-troca', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().efetuarTroca(req.body))
		})
	})
	app.post('/api/db/separacao-ecommerce/bloquear-item', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().bloquearItem(req.body))
		})
	})
	app.post('/api/db/separacao-ecommerce/atualizar-sugestao', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().atualizarSugestao(req.body))
		})
	})
/* 	app.post('/api/db/separacao-ecommerce/atualizar-estado-troca', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().atualizaEstadoTroca(req.body))
		})
	}) */
	app.post('/api/db/separacao-ecommerce/consulta-lojas', (req, res) => {
		new Conexao().consincoTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().consultaLojas())
		})
	})
	app.post('/api/db/separacao-ecommerce/adicionar-item', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().adicionarItem(req.body))
		})
	})
	app.post('/api/db/separacao-ecommerce/atualiza-tabela-ecommerce', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().atualizaTabelaEcommerce())
		})
	})
	app.post('/api/db/separacao-ecommerce/dados-cliente', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().consultaDadosCliente(req.body.nroPedido))
		})
	})
	app.post('/api/db/separacao-ecommerce/atualiza-qtd-pedida', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().atualizaQtdPedida(req.body))
		})
	})
	app.post('/api/db/separacao-ecommerce/cancelar-item', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().cancelarItem(req.body))
		})
	})
	app.post('/api/db/separacao-ecommerce/retornar-separacao', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().retornarSeparacao(req.body))
		})
	})
	app.post('/api/db/separacao-ecommerce/alterar-status-separacao', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().alterarStatusSeparacao(req.body))
		})
	})
	app.post('/api/db/separacao-ecommerce/valor-original-pedido', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().valorOriginalPedido(req.body))
		})
	})
	app.post('/api/db/separacao-ecommerce/troca-sem-sugestao', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().trocaSemSugestao(req.body))
		})
	})
	app.post('/api/db/separacao-ecommerce/cancelar-troca', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().cancelarTroca(req.body))
		})
	})
	app.post('/api/db/separacao-ecommerce/pedido-em-separacao', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().pedidoEmSeparacao(req.body))
		})
	})
	app.post('/api/db/separacao-ecommerce/pedido-em-pausa', (req, res) => {
		new Conexao().separacaoEcommerceTst().then(conexao => {
			new Request().resolver(req, res, conexao, new Query().pedidoEmPausa(req.body))
		})
	})
}