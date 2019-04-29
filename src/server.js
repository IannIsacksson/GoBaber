const express = require('express')
const session = require('express-session')
const LokiStore = require('connect-loki')(session)
const nunjucks = require('nunjucks')
const path = require('path')
const flash = require('connect-flash')

class App {
  constructor () {
    // Faz a função do app = this.express
    this.express = express()
    // Resposavel por armazenar se a aplicação está ou não em ambiente de produção
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    // Código para lidar com formulários
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(flash())
    this.express.use(
      session({
        store: new LokiStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions.db')
        }),
        name: 'root',
        secret: 'MyAppSecret',
        resave: true,
        saveUninitialized: true
      })
    )
  }

  views () {
    // Informar aonde as páginas vão está
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      // Função parecida com a nodemon.
      // Usar apenas em ambiente de desenvolvimento (isDEv), em produção há perda de performance
      watch: this.isDev,
      // Informa o nosso servidor "Express"
      express: this.express,
      // Carrega automaticamente as páginas
      autoescape: true
    })

    this.express.use(express.static(path.resolve(__dirname, 'public')))
    // O set() passa configurações globais.
    // Neste caso, diz para o express usar os arquivos njk como view engine
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

// exporta apenas o express
module.exports = new App().express
