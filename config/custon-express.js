const express = require("express")
const consign = require("consign")
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
	cors: {
		methods: ['GET', 'POST']
	}
})

module.exports = () => {

	app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }))
	app.use(bodyParser.json({ limit: '50mb', extended: true }))
	app.use((req, res, next) => {

		res.header("Access-Control-Allow-Origin", "*")

		res.header("Access-Control-Allow-Methods", 'POST, GET')

		app.use(cors())

		next()
	})

	consign()
		.include('rotas')
		.into(app)

	return ([server, io])
}