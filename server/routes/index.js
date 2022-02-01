const Router = require('express') //Объект, который заимствуется из express, прокси для всех роутеров
const router = new Router()
//Здесь заданы ссылки на все необходимые файлы роутеров
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
//А это подключение файлов роутеров с помощью router.use. Первым аргументом идет адрес URL, а вторым отсылка на файл с соответствующим роутером
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)

module.exports = router
