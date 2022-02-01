import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode' //npm i jwt-decode (пак для декодирования токенов)

export const registration = async (email, password) => {
  const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' }) //здесь можно переставить роль на USER
  localStorage.setItem('token', data.token) //метод SetItem относится к объекту localStorage и позволяет установить имя и соответсвующее ему значение в localStorage, в данном случае 'token' является именем а data.token - значением
  return jwt_decode(data.token)
}

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth') //здесь метод get а не post, потому что данные сверяются а не вносятся в базу данных
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

//Это набор функций для отправки запросов с клиента на сервер, здесь находятся все функции, которые касаются пользователей, регистрации и авторизации
