const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('', '', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectado ao banco com sucesso!')
} catch (err) {
    console.log('Não foi possível conectar: ', err)
}

module.exports = sequelize
