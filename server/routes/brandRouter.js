const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), brandController.create)
router.get('/', brandController.getAll)

module.exports = router

//Это роутер брэндов. Здесь подключен соотвтетствующий котроллер brandController и middleware, проверяющий роль пользователя
//Далее описаны методы, которыми можно обращаться к этому роутеру, а именно метод .post для создания новых брэндов и метод .get для получения информации по всем брэндам
