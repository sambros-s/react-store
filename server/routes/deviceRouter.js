const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router
//От brandRouter и typeRouter роутер девайсов отличается наличием дополнительного метода get, который обращается к методу .getOne deviceContoller-a (позволяет получить информацию об одном, выбранном устройстве, указав его id)
