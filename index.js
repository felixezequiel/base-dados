const app = require('./config/custon-express')()[0]
const skt = require('./socket/index')()

app.listen(1000, () => console.log(new Date()+' - Servidor rodando na porta 1000'))