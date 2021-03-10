class Query {
  consultaUsuario(usuario, senha) {
    return `
      SELECT
      A.CODUSUARIO,
      A.SENHA,
      A.EMPRESA,
      A.GRUPO
      FROM CONSINCO.VW_KOCH_USUARIOS A
      WHERE A.CODUSUARIO = '${usuario}'
      AND CONSINCO.PKG_C5SEGURANCA.DECODIFICAR(A.SENHA) = '${senha}'
    `
  }
  consultaPedidos(loja) {
    return `
      SELECT 
      A.NROPEDIDO,
      A.NROPEDIDO_SITE,
      
      ROUND((TO_DATE(TO_CHAR(TEMPO,'DD/MM/YYYY HH24'),'DD/MM/YYYY HH24') - TO_DATE('01/01/1900','DD/MM/YYYY')) * 24)||':'||
      TO_CHAR(A.TEMPO,'MI')||':'||
      TO_CHAR(A.TEMPO,'SS') AS TEMPO,

      NVL((SELECT DISTINCT X.TEM_TROCA FROM SEC_PEDIDO_ITEM X WHERE X.NROPEDIDO = A.NROPEDIDO AND X.LOJA = A.LOJA AND X.TEM_TROCA = 1),0) AS TEM_TROCA,
      A.LOJA,
      TO_CHAR(A.DATAHORA_ENTREGA, 'DD/MM') AS DATA,
      A.STATUS
      FROM SEC_PEDIDO A
      WHERE LOJA = '${loja}'
      AND A.STATUS NOT IN ('F', 'FAT')

      ORDER BY DATA
    `
  }
  consultaPedidosPendentes(loja) {
    return `
      SELECT 
      A.NROPEDIDO,

      ROUND((TO_DATE(TO_CHAR(TEMPO,'DD/MM/YYYY HH24'),'DD/MM/YYYY HH24') - TO_DATE('01/01/1900','DD/MM/YYYY')) * 24)||':'||
      TO_CHAR(A.TEMPO,'MI')||':'||
      TO_CHAR(A.TEMPO,'SS') AS TEMPO,

      (SELECT Y.CODUSUARIO FROM SEC_PEDIDO_ITEM Y WHERE Y.NROPEDIDO = A.NROPEDIDO AND Y.LOJA = A.LOJA AND Y.DATA_HORA = (SELECT MAX(YY.DATA_HORA) FROM SEC_PEDIDO_ITEM YY WHERE YY.NROPEDIDO = Y.NROPEDIDO AND YY.LOJA = Y.LOJA)) AS ULTIMO_USUARIO,

      NVL((SELECT DISTINCT X.TEM_TROCA FROM SEC_PEDIDO_ITEM X WHERE X.NROPEDIDO = A.NROPEDIDO AND X.LOJA = A.LOJA AND X.TEM_TROCA = 1),0) AS TEM_TROCA,
      
      A.LOJA,
      TO_CHAR(A.DATAHORA_ENTREGA, 'DD/MM/YYYY HH24:MI:SS') AS DATA,
      A.STATUS
      FROM SEC_PEDIDO A
      WHERE A.LOJA = '${loja}'
      AND A.STATUS IN ('P', 'AT')
      ORDER BY DATA
    `
  }
  detalhaPedido(pedido, loja) {
    return `
      SELECT
      A.LOJA,
      A.COD_PRODUTO,
      A.DESCRICAO,
      A.IMAGEM AS URLECOMMERCEIMG,
      A.PESAVEL,
      A.QT_ESTOQUE,
      A.DT_ULT_VENDA,
      A.DT_ULT_ENTRADA,
      B.NROPEDIDO,
      B.QTD_PEDIDA,
      B.QTD_ATENDIDA,
      B.DATA_HORA,
      B.ITEM_SUGESTAO,
      B.TEM_TROCA,
      B.VALOR_ITEM,
      B.BLOQUEADO,
      
      ROUND((TO_DATE(TO_CHAR(C.TEMPO,'DD/MM/YYYY HH24'),'DD/MM/YYYY HH24') - TO_DATE('01/01/1900','DD/MM/YYYY')) * 24)||':'||
      TO_CHAR(C.TEMPO,'MI')||':'||
      TO_CHAR(C.TEMPO,'SS') AS TEMPO,

      C.STATUS,
      C.PAGAMENTO,
      C.VALOR_PEDIDO,
      B.SEQITEMPEDIDO AS SEQUENCIAL
      FROM CONSINCO.VW_KOCH_SEP_ECOMMERCE A
      JOIN SEC_PEDIDO_ITEM B 
      ON B.LOJA = A.LOJA 
      AND B.COD_PRODUTO = A.COD_PRODUTO
      JOIN SEC_PEDIDO C 
      ON C.LOJA = B.LOJA 
      AND C.NROPEDIDO = B.NROPEDIDO
      WHERE 0=0
      AND B.NROPEDIDO = ${pedido} 
      AND C.LOJA = ${loja}
      AND C.STATUS != 'FAT'
      ORDER BY VALOR_ITEM DESC
    `
  }
  codBarrasPedido(codProduto) {
    return `
      SELECT
      A.COD_PRODUTO,
      A.COD_BARRA
      FROM VW_KOCH_SEP_ECOMMERCE_CODIGOS A
      WHERE A.COD_PRODUTO ='${codProduto}'
    `
  }
  consultaDescricao(codBarras, loja) {
    return `
      SELECT DISTINCT
      A.DESCRICAO,
      B.IMAGEM,
      B.PRECO,
      A.COD_PRODUTO,
      B.QT_ESTOQUE AS ESTOQUE
      FROM VW_KOCH_SEP_ECOMMERCE_CODIGOS A
      JOIN VW_KOCH_SEP_ECOMMERCE B ON B.COD_PRODUTO = A.COD_PRODUTO
      WHERE 0=0
      AND (A.COD_BARRA IN ('${codBarras.join("','")}')
      OR TO_CHAR(A.COD_PRODUTO) IN ('${codBarras.join("','")}')
      OR A.DESCRICAO LIKE UPPER('%${codBarras.join('%%').replace(/\s+/g, '%%')}%'))
      AND B.LOJA = ${loja}
    `
  }
  consultaMonitoramentoTroca() {
    return `
      SELECT * FROM VW_BUSCA_PROD_COM_TROCA
    `
  }
  consultaDetalhesTroca(nroPedido, loja) {
    return `
    SELECT
    A.LOJA,
    A.COD_PRODUTO,
    A.DESCRICAO,
    A.IMAGEM AS URLECOMMERCEIMG,
    A.PESAVEL,
    A.QT_ESTOQUE,
    A.DT_ULT_VENDA,
    A.DT_ULT_ENTRADA,
    B.NROPEDIDO,
    B.QTD_PEDIDA,
    B.QTD_ATENDIDA,
    B.DATA_HORA,
    B.ITEM_SUGESTAO,
    B.TEM_TROCA,

    ROUND((TO_DATE(TO_CHAR(C.TEMPO,'DD/MM/YYYY HH24'),'DD/MM/YYYY HH24') - TO_DATE('01/01/1900','DD/MM/YYYY')) * 24)||':'||
    TO_CHAR(C.TEMPO,'MI')||':'||
    TO_CHAR(C.TEMPO,'SS') AS TEMPO,
    
    C.STATUS,
    D.NROPEDIDOAFV AS NRO_PEDIDO_SITE,
    E.NOMERAZAO AS NOME_CLIENTE,
    E.FONEDDD1||'-'||E.FONENRO1 AS FONE,
    E.CIDADE,
    E.LOGRADOURO,
    E.NROLOGRADOURO,
    B.VALOR_ITEM,
    B.SEQITEMPEDIDO AS SEQUENCIAL,
    B.BLOQUEADO
    FROM CONSINCO.VW_KOCH_SEP_ECOMMERCE A
    JOIN SEC_PEDIDO_ITEM B ON B.LOJA = A.LOJA AND B.COD_PRODUTO = A.COD_PRODUTO
    JOIN SEC_PEDIDO C ON C.LOJA = B.LOJA AND C.NROPEDIDO = B.NROPEDIDO
    JOIN CONSINCO.MAD_PEDVENDA D ON D.NROPEDVENDA = C.NROPEDIDO AND D.NROEMPRESA = C.LOJA
    JOIN CONSINCO.GE_PESSOA E ON E.SEQPESSOA = D.SEQPESSOA
    WHERE 0=0
    AND B.NROPEDIDO = ${nroPedido} 
    AND B.TEM_TROCA = 1
    AND C.STATUS != 'FAT'
    ORDER BY 1
    `
  }
  atualizaStatusCabecalho(body) {
    return `
      UPDATE SEC_PEDIDO
      SET STATUS = '${body.status}'
      WHERE LOJA = ${body.loja}
      AND NROPEDIDO = ${body.nroPedido}
    `
  }
  atualizaQtdAtendida(body) {
    return `
      UPDATE SEC_PEDIDO_ITEM
      SET QTD_ATENDIDA = '${body.atendido}',
      DATA_HORA = SYSDATE,
      CODUSUARIO = '${body.usuario}'
      WHERE LOJA = ${body.loja}
      AND NROPEDIDO = ${body.nroPedido}
      AND COD_PRODUTO = ${body.codProduto}
    `
  }
  atualizaTempoPercorrido(body) {
    return `
      UPDATE SEC_PEDIDO
      SET TEMPO = (TO_DATE('01/01/1900','DD/MM/YYYY') + (${body.tempo.hora}/24) + (${body.tempo.minutos}/60/24) + (${body.tempo.segundos}/60/60/24))
      WHERE NROPEDIDO = ${body.nroPedido}
      AND LOJA = ${body.loja}
    `
  }
  validarAceite(body) {
    return `
      SELECT 
      ROUND((TO_DATE(TO_CHAR(A.TEMPO,'DD/MM/YYYY HH24'),'DD/MM/YYYY HH24') - TO_DATE('01/01/1900','DD/MM/YYYY')) * 24)||':'||
      TO_CHAR(A.TEMPO,'MI')||':'||
      TO_CHAR(A.TEMPO,'SS') AS TEMPO
      FROM SEC_PEDIDO A
      WHERE A.NROPEDIDO = ${body.nroPedido}
      AND LOJA = ${body.loja}
    `
  }
  efetuarTroca(body) {
    return `
      BEGIN
        SP_KOCH_TROCAPRODUTO(
          pnNroPedVenda     => ${body.nroPedido},
          pnNroEmpresa      => ${body.loja},
          pnSeqProdutotroca => ${body.codProduto},
          psUsuTroca        => '${body.usuario.toUpperCase()}',
          pnSeqPedVendaItem => ${body.sequencial});
      END;
    `
  }
  atualizaEstadoTroca (body) {
    return `
      UPDATE SEC_PEDIDO_ITEM
      SET ITEM_SUGESTAO = '${body.codProduto}',
      BLOQUEADO = 1
      WHERE NROPEDIDO = ${body.nroPedido}
      AND SEQITEMPEDIDO = ${body.sequencial}
      AND LOJA = ${body.loja}
    `
  }
  bloquearItem(bodi) {
    return `
      UPDATE SEC_PEDIDO_ITEM
      SET BLOQUEADO = 1
      WHERE NROPEDIDO = ${bodi.nroPedido}
      AND COD_PRODUTO = ${bodi.codProduto}
      AND LOJA = ${bodi.loja}
    `
  }
  atualizarSugestao (body) {
    return `
      UPDATE SEC_PEDIDO_ITEM
      SET ITEM_SUGESTAO = '${body.sugestao}',
      TEM_TROCA = '${body.temTroca}'
      WHERE NROPEDIDO = ${body.nroPedido}
      AND LOJA = ${body.loja} 
      AND COD_PRODUTO = ${body.produto}
    `
  }
  consultaLojas () {
    return `
      SELECT
      A.NOMEREDUZIDO AS LOJA
      FROM MAX_EMPRESA A
      WHERE 0=0
      AND A.NROEMPRESA < 500
      AND A.NROEMPRESA NOT IN (95,96,97,98,99)
      ORDER BY A.NROSEGMENTOPRINC, A.NROEMPRESA
    `
  }
  adicionarItem (body) {
    return `
      BEGIN
        SP_KOCH_INSEREPRODUTO(
          pnNroPedVenda => ${body.nroPedido},
          pnNroEmpresa  => ${body.loja},
          pnSeqProduto  => ${body.codProduto},
          psUsuInsere   => '${body.usuario}',
          pnQtdPedida   => ${body.quantidade});
      END;
    `
  }
  atualizaTabelaEcommerce() {
    return `
      BEGIN
        IMPORTA_PEDIDOS_SEPARACAO;
      END;
    `
  }
  consultaDadosCliente(nroPedido) {
    return `
    SELECT 
    E.NOMERAZAO AS NOME_CLIENTE,
    E.FONEDDD1||'-'||E.FONENRO1 AS FONE,
    E.CIDADE,
    E.LOGRADOURO,
    E.NROLOGRADOURO
    FROM CONSINCO.GE_PESSOA E
    WHERE 0=0
    AND EXISTS (SELECT 1 
    FROM sec_pedido X 
    WHERE X.COD_CLIENTE = E.SEQPESSOA
    AND (X.NROPEDIDO = ${nroPedido} OR X.NROPEDIDO_SITE = ${nroPedido}))
    `
  }
  atualizaQtdPedida(body) {
    return `
      UPDATE SEC_PEDIDO_ITEM
      SET QTD_PEDIDA = ${body.qtdPedida}
      WHERE NROPEDIDO = ${body.nroPedido}
      AND LOJA = ${body.loja}
      AND COD_PRODUTO = ${body.codProduto}
    `
  }
  cancelarItem(body) {
    return `
      UPDATE SEC_PEDIDO_ITEM
      SET QTD_ATENDIDA = 0,
      BLOQUEADO = 1
      WHERE NROPEDIDO = ${body.nroPedido}
      AND LOJA = ${body.loja}
      AND COD_PRODUTO = ${body.codProduto}
    `
  }
  retornarSeparacao (body) {
    return `
      BEGIN
        UPDATE SEC_PEDIDO 
        SET STATUS = 'RT'
        WHERE NROPEDIDO = ${body.nroPedido}
        AND LOJA = ${body.loja};

        UPDATE SEC_PEDIDO_ITEM
        SET TEM_TROCA = 0
        WHERE NROPEDIDO = ${body.nroPedido}
        AND LOJA = ${body.loja};
      END;
    `
  }
  alterarStatusSeparacao (body) {
    return `
      UPDATE SEC_PEDIDO 
      SET STATUS = 'RT'
      WHERE NROPEDIDO = ${body.nroPedido}
      AND LOJA = ${body.loja}
    `
  }
  valorOriginalPedido (body) {
    return `
      SELECT 
      VALOR_PEDIDO AS VALOR,
      STATUS
      FROM SEC_PEDIDO
      WHERE NROPEDIDO = ${body.nroPedido}
      AND LOJA = ${body.loja}
    `
  }
  trocaSemSugestao (body) {
    return `
      UPDATE SEC_PEDIDO_ITEM
      SET TEM_TROCA = '1',
      BLOQUEADO = '0',
      ITEM_SUGESTAO = NULL
      WHERE NROPEDIDO = ${body.nroPedido}
      AND COD_PRODUTO = ${body.codProduto}
      AND LOJA = ${body.loja}
    `
  }
  cancelarTroca (body) {
    return `
      UPDATE SEC_PEDIDO_ITEM
      SET TEM_TROCA = '0',
      BLOQUEADO = '0'
      WHERE NROPEDIDO = ${body.nroPedido}
      AND COD_PRODUTO = ${body.codProduto}
      AND LOJA = ${body.loja}
    `
  }
  pedidoEmSeparacao (body) {
    return `
      UPDATE SEC_PEDIDO
      SET STATUS = 'SA'
      WHERE NROPEDIDO = ${body.nroPedido}
      AND LOJA = ${body.loja}
    `
  }
  pedidoEmPausa (body) {
    return `
      UPDATE SEC_PEDIDO
      SET STATUS = 'SP'
      WHERE NROPEDIDO = ${body.nroPedido}
      AND LOJA = ${body.loja}
    `
  }
}
module.exports = Query