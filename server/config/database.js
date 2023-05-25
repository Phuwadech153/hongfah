const Sequelize = require('sequelize')

const sequelize = new Sequelize('hongfah', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  dialectOptions: {
    timezone: '+07:00'
  },
  logging: false,
  pool: {
    max: 100,
    min: 0,
    idle: 200000,
    acquire: 1000000
  }
})


sequelize
  .authenticate()
  .then(() => console.log('Database Connected'))
  .catch(err => console.log('error: ', err))

sequelize
  .sync()
  .then(() => console.log('Connect Successfully!'))
  .catch(e => console.error(e))

module.exports = sequelize
