const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
  process.env.DB_NAME /*Название базы данных*/,
  process.env.DB_USER /* Пользователь базы данных*/,
  process.env.DB_PASSWORD /*Пароль*/,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
)

//Это основной файл описывающий базу данных при помощи модуля sequelize. Внутрь этого объекта помещаются следующиме параметры: название базы данных, имя пользователя, пароль и наконец объект с указанием диалекта (postgres, потому что мы используем postgres), хост и порт для базы данных.
