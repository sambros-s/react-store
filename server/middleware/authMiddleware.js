const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  //Здесь не совсем понятно для чего нужен этот if и почему он перенаправляет на next().
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    //Здесь токен, получаемый из запроса, поле headers, поле autthorisation разбивается методом .split по пробелу на массив. У этого массива забирается значение по индексу [1]. Это значение и есть значение токена, потому что по индексу [0] у этого токена идет слово Bearer.
    const token = req.headers.authorization.split('')[1]
    if (!token) {
      //Если токена нет то ответом от authMiddleware будет статус 401 и соответствующее сообщение. next() не будет запущен и авторизация таким образом не будет подтверждена.
      return res.status(401).json({ message: 'Не авторизованный пользователь' })
    }
    //Далее с помощью метода jwt.verify декодируется токен, взятый их хедера запроса. Вторым параметром в этот метод передается секретный ключ из .env
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    //И далее вызывается следующая в списке процедура, а это метод .check в userController.
    next()
  } catch (e) {
    res.status(401).json({ message: 'Не авторизованный пользователь' })
  }
}

//Этот middleware вызывается в userRouter по запросу get, перед вызовом метода userController.check.
