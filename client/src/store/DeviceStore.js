import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
  constructor() {
    this._types = []
    this._brands = []
    this._devices = []
    this._cartDevices = []
    this._selectedType = {} //Очень важно что selectedType и selectedBrand это объекты, а не массивы
    this._selectedBrand = {}

    this._page = 1
    this._totalCount = 5
    this._limit = 8

    makeAutoObservable(this)
  }

  setTypes(types) {
    this._types = types
  }

  setBrands(brands) {
    this._brands = brands
  }

  setDevices(devices) {
    this._devices = devices
  }

  setCartDevices(devices) {
    this._cartDevices = devices
  }

  setSelectedType(type) {
    this._selectedType = type
    this.setPage(1)
  }

  setSelectedBrand(brand) {
    this._selectedBrand = brand
    this.setPage(1)
  }

  setPage(page) {
    this._page = page
  }

  setTotalCount(count) {
    this._totalCount = count
  }

  setLimit(limit) {
    this._limit = limit
  }

  get types() {
    return this._types
  }

  get brands() {
    return this._brands
  }

  get devices() {
    return this._devices
  }

  get cartDevices() {
    return this._cartDevices
  }

  get selectedType() {
    return this._selectedType
  }

  get selectedBrand() {
    return this._selectedBrand
  }

  get page() {
    return this._page
  }

  get totalCount() {
    return this._totalCount
  }

  get limit() {
    return this._limit
  }
}

//Хранилище информации о девайсах для последующего импорта с помощью useContext. Сначала идет инициация этого класса при помощи constructor() и перечисление всех параметров, которые включает в себя этот объект. Затем идет перечисление методов, позволяющих вносить изменения в эти параметры (set-еры) и методов, которые получают значения этих параметров (get-еры)
