const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router
//Здесь для одного контроллера реализованы два разных метода post - регистрации нового пользователя и логина уже зарегистрированного. Метод get по адресу /auth, реализует функцию контроллера check, которая будет проверять авторизован ли пользователь на сайте или нет.
