class MontaObjeto {
	construir(array) {
		let novoArray = array.rows.map((valor, indice) => {
			let resultado = valor.map((item, i) => {
				return `"${array.metaData[i].name}": "${item}"`
			})
			return `{${resultado}}`
		})
		let arrayObj = []
		novoArray.forEach(item => {
			arrayObj.push((JSON.parse(item)))
		})
		return arrayObj
	}
}
module.exports = MontaObjeto