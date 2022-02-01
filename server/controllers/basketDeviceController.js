const { BasketDevice, Brand } = require('../models/models')

class BasketDeviceController {
  async create(req, res) {
    const { id } = req.body
    const basketDevice = await Brand.create({ id })
    return res.json(basketDevice)
  }

  async getAll(req, res) {
    const basketDevices = await BasketDevice.findAll()
    return res.json(basketDevices)
  }
}
