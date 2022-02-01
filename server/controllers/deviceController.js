const uuid = require('uuid') //npm install uuid (генератор айдишников для файлов с картинками)
const path = require('path') // модуль nodejs
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

//Здесь идет описание класса для контроллера девайсов. Это описание содержит набор функций к которым можно обращаться.
class DeviceController {
  //Первая функция create принимает в себя поля name, price, brandId, typeId и info из тела запроса. Затем файл с изображением из файлов запроса. Затем генерирует уникальное имя файла для изображения и при помощи path.resolve перекидывает его на директорию выше в папку static.
  async create(req, res, next) {
    //Здесь используем цикл try catch, потому что вероятнось ошибки или неправильно введенных данных выще.
    try {
      let { name, price, brandId, typeId, info } = req.body
      const { img } = req.files
      let fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      //Затем с помощью асинхронной Device.create созздается новый девайс в таблице девайсов со всеми заданными полями (кроме info) и файлом изображения.
      const device = await Device.create({ name, price, brandId, typeId, img: fileName })
      //Далее если в поле info (а это - хакактеристики устройства), есть какая-то информация
      if (info) {
        //JSON.parse разбирает строку info таким образом, что формирует из данных info объект, у которого мы сможем выципить значения title и description. Здесь мы перезаписываем info этим новым значением.
        info = JSON.parse(info)
        //Далее для каждого объекта info (а их может быть несколько для одного девайса) мы добавляем в таблицу DeviceInfo нашей базы данных новую строку содержащую столбцы title, description и deviceId (что свяжет эту характеристику с текущим девайсом).
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        )
      }
      //Далее возвращается описанная асинхронная функция, куда передаются данные девайса из запроса. Метод .json() указывает объекту класса response (res), формат в котором мы хотим получить данные. То есть мы могли бы написать return res(device) и получили бы данные в другом формате (возможно в строке?)
      return res.json(device)
    } catch (e) {
      //Обработка эррора через один из методов, описанных в файле ApiError. Функция next, насколько я понимаю, указывает какой middleware следует запустить после окончания цикла этого запроса
      next(ApiError.badRequest(e.message))
    }
  }

  //Это немного усложненный запрос getAll, по сравнению с тем, что был в brandContoller или typeController. Здесь из строки запроса запроса req.query (это не опечатка, так и есть строка запроса запроса) мы получим дополнительные ограничители, касающиеся того, какие именно девайсы и сколько мы должны достать из базы данных. Это фильтры по бренду и типу (с помощью соответствующих id), лимит запроса на страницу и номер самой страницы.
  //offset это по идее осмещение, на которое должен сместиться запрос при переходе на новую страницу. Например если это вторая страница, то отрисовка девайсов должна начаться с того, который идет 9-м.
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query
    page = page || 1
    limit = limit || 8
    let offset = page * limit - limit
    let devices
    //Здесь описаны четыре варианта запроса, в случае если не указаны id бренда и типа, если указаны, а также если указан только один из них. В случае если они указаны в метод .findAndCountAll помимо лимита страницы и смещения страницы передается так же параметр where (тут запахло sql) с указанием условия по которому будет осуществляться запрос, в данном случае это будут сопоставления с brandId и/или typeId.
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset })
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset })
    }
    //Возвращается, как обычно, данные в формате json.
    return res.json(devices)
  }

  //Это запрос на то чтобы достать из базы одно конкретное устройство по его id. Здесь в запросе используется req.params, откуда собственно через деструктуризацию мы и получаем нужный id. Метод .params это как если бы запрос выглядел например так http://localhost/devices/12 где 12 - это и есть наш id. В случае метода .query из предыдущего запроса это бы выглядело например как http://localhost/devices?limit=8page=2
  //Здесь используется метод .findOne, и в параметры, помимо отфильтровки по id, добавлен include, который обращается к model, таблице DeviceInfo и получает оттуда характеристики девайса и добавляя их в ответ как 'info'. Это на первый взгляд немного странно, но на самом деле мы обращаемся к другой таблице, чтобы получить оттдуа информацию и добавить ее к полям нашего запроса. точно также мы могли бы запросить дополнительную информацию из  таблицы брэндов, например.
  async getOne(req, res) {
    const { id } = req.params
    const device = await Device.findOne({ where: { id }, include: [{ model: DeviceInfo, as: 'info' }] })
    return res.json(device)
  }
}

module.exports = new DeviceController()
