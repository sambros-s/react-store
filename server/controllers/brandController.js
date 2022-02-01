const { Brand } = require('../models/models') //Это отсылка на модели базы данных в соответствующем файле
const ApiError = require('../error/ApiError') //Это отсылка на эррор-хендлер

//Здесь идет описание класса для контроллера брэндов. Это описание содержит набор функций к которым можно обращаться.
class BrandController {
  //Первая функция create принимает в себя поле name из тела запроса (req). Затем формирует асинхронный запрос в базу данных с тем, чтобы создать в ней с помощью метода .create брэнд с соответствующим именем. И наконец возвращает (res) информацию о вновь созданном брэнде в формате json.
  async create(req, res) {
    const { name } = req.body
    const brand = await Brand.create({ name })
    return res.json(brand)
  }

  //Вторая функция с помощью метода .findAll возвращает данные о всех брэндах находящихся в базе, также в формате json.
  async getAll(req, res) {
    const brands = await Brand.findAll()
    return res.json(brands)
  }
}

module.exports = new BrandController()
