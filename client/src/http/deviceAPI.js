import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'

export const createType = async (type) => {
  const { data } = await $authHost.post('api/type', type)
  return data
}

export const fetchTypes = async () => {
  const { data } = await $host.get('api/type')
  return data
}

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('api/brand', brand)
  return data
}

export const fetchBrands = async () => {
  const { data } = await $host.get('api/brand')
  return data
}

export const createDevice = async (device) => {
  const { data } = await $authHost.post('api/device', device)
  return data
}

// в этом запросе после адреса запроса задаются параметры, метод get здесь явно относится к axios, не совсем понятно почему не обязательно импортировать axios в этом файле
export const fetchDevices = async (typeId, brandId, page, limit = 8) => {
  const { data } = await $host.get('api/device', {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  })
  return data
}

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get('api/device/' + id)
  return data
}

//Здесь находится набор функций, который позволяет взаимодействовать с сервером в том что касается добавлений новых типов, брэндов и устройств в базу данных, а также получения доступа к уже существующим