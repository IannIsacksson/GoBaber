module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.DATE
  })

  // Relacionamento com a mesma tabela User.
  // O belongsTo é usado para armazenar o relacionamento na mesma tabela, neste caso Appointment.
  Appointment.associate = models => {
    Appointment.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
    Appointment.belongsTo(models.User, {
      as: 'provider',
      foreignKey: 'provider_id'
    })
  }
  // Para criar a migration é preciso criar o model
  // Depois rodar o: npx sequelize migration:create --name=create-appointments
  return Appointment
}
