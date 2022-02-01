const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка!' })
}

//Этот middleware по-видимому нужен для описания того, что должно произойти в случае если ни один из описанных в классе ApiError методов не аключает в себя err который передается сюда аргументом. Возможно этот middleware не доделан.
//Этот файл подключен через индекс и по-видимому через него направляются сообщения об ошибках на ApiError.
