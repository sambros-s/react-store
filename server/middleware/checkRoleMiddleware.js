const jwt = require('jsonwebtoken')

module.exports = function (role) {
  return function (req, res, next) {
    //Смотри информацию в authMiddleware.
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(401).json({ message: 'Не авторизованный пользователь' })
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      //Здесь начинаются отличия от authMiddleware. Декодированная роль сравнивается с ролью, которая идет аргументом (в нашем случае это будет роль ADMIN) и если пользователь, отправивший этот запрос действительно имеет роль ADMIN, то метод next() осуществит переход к выполнению следующей функции, иначе checkRoleMiddleware выдаст статус и сообщение об ошибке.
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'У вас нет доступа' })
      }
      req.user = decoded
      next()
    } catch (e) {
      res.status(401).json({ message: 'Не авторизованный пользователь' })
    }
  }
}

//Этот middleware нужен для проверки роли пользователя. Он вызывается перед методами .post в typeController, brandController и deviceController, которые служат для создания новой информации в базе данных. Например brandController.create.
