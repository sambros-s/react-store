//Команды в командной строке: npm init -y
//Авто обновление сервера npm install -D nodemon

require('dotenv').config() //npm install dotenv
const express = require('express') // npm install express pg pg-hstore (фрейморк для бэкенда)
const sequelize = require('./db') // npm install sequelize (работа с базой данных)
const models = require('./models/models.js')
const cors = require('cors') // npm install cors (позволяет производить безопасный обмен данными между разными доменами)
const fileUpload = require('express-fileupload') //npm install express-fileupload (пакет для загрузки файлов)
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors()) // Метод .use запускает промежуточное ПО
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router) //Это отсылка к директории с роутерами,а  конкертно к файлу index, где содержатся все маршруты. Ее рекомендуется размещать ниже обработчиков маршрутов.

app.use(errorHandler) //Обработка ошибок, последний Middleware

const start = async () => {
  try {
    await sequelize.authenticate() //Подключение к базе данных
    await sequelize.sync() //Сверяет состояние базы данных со cхемой данных описанной в файле db.js
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()

//Это основной файл серверного приложения. Вначале идет список зависимостей и подключаются все модули, необходимые для работы сервера.
//Затем при помощи app.use подключаются промежуточное програмное обеспечение, идет отсылка на директорию с роутерами и обработку ошибок.
//Затем описывается асинхронная функция start, запускающая приложение, она подключается к базе данных, сверяет ее состояние со схемой и наконец запускает сам сервер с помощью app.listen.
//Затем запускается функция start()
