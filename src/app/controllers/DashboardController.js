const { User } = require('../models')

class DashboardController {
  async index (req, res) {
    // Buscar todos os usuários que prestam serviço
    const providers = await User.findAll({ where: { provider: true } })

    return res.render('dashboard', { providers })
  }
}

module.exports = new DashboardController()
