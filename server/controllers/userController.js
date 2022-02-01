const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt') //npm i bcrypt
const jwt = require('jsonwebtoken') //npm i jsonwebtoken
const { User, Basket } = require('../models/models')

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
} //Эта функция генерирует jwt-токен, принимая в себя данные пользователя (id, почту и роль) это данные, которые будут закодированы, второй параметр это секретный код - то, с помощью чего будет проходить кодирование.

class UserController {
  //Первая функция UserController служит для регистрации новых пользователей. Она запрашивает почту, пароль и роль нового пользователя из тела запроса.
  async registration(req, res, next) {
    const { email, password, role } = req.body
    //Этот if с помощью функции next отправляет на ApiError сообщение об ошибке в случае если не задан email или пароль.
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'))
    }
    //Этот if с помощью метода .findOne ищет нет ли уже в базе данных пользователя с таким емейлом и если такой найдет отправляет на ApiError с соответствующим сообщением об ошибке.
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return next(ApiError.badRequest('Пользовальтель с таким ником уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5) //В этой строке происходит хэширование пароля, или другими словами его шифрование, вторым параметром указывается 'соль' или количество раундов хэширования. Пароли в базах данных хранятся только в захешированном виде.
    const user = await User.create({ email, role, password: hashPassword }) // Здесь создается строка в таблице пользователей, в поле пароль вводится захешированный пароль.
    const basket = await Basket.create({ userId: user.id }) //Здесь создается строка пользователя в таблице с корзинами. !!! Внимание !!! С этого момента нужно начинать строить серверную часть корзины.
    const token = generateJwt(user.id, user.email, user.role) //Эта функция генерации токена, который будет храниться в LocalStorage и использоваться для проверки авторизации пользователей.

    return res.json({ token })
  } //

  async login(req, res, next) {
    //Вторая функция служит для логина уже зарегестрированных пользователей.
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    //Этот if смотрит есть ли пользователь с введенной в запрос почтой и если такой есть, отправляет на ApiError сообщение об ошибке.
    if (!user) {
      return next(ApiError.badRequest('Пользователь не найден'))
    }
    //Далее пароль из запроса password с помощью метода bcrypt.compareSync сверяется с паролем из базы данных user.password и в случае несоответствия на ApiError передается сообщение об ошибке.
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.badRequest('Неверный пароль!'))
    }
    //Далее генерируется токен, потому что логин был успешен.
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token })
  }

  async check(req, res, next) {
    //Функция check просто возвращает токен, сенерированный из id, почты и роли юзера. Здесь нет никакого функционала, потому что весь функционал по провереке авторизации пользователя находится в authMiddleware, которая вызывется перед этим методом в запросе .get в userRouter.
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({ token })
  }
}

module.exports = new UserController()
