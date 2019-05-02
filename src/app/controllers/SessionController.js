const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    // Recupera o email e senha enviados pelo usuário, depois compara com o DB
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      req.flash('error', 'Usuário não encontrado')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      req.flash('error', 'Senha incorreta')
      return res.redirect('/')
    }

    req.session.user = user

    const { provider } = user

    if (provider === false) {
      return res.redirect('/app/dashboard')
    } else {
      return res.redirect('/app/schedule')
    }
  }

  // Encerra a sessão
  destroy (req, res) {
    req.session.destroy(() => {
      // root é o nome dado a sessao no server.js
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
