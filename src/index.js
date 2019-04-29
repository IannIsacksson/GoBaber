// A const server está usando o express exportado
const server = require('./server')
// Se o servidor passar uma variável PORT usaremos ela, senão a 3000
server.listen(process.env.PORT || 3000)
