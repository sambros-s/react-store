import axios from 'axios' //npm i axios (это облегченный клиент HTTP на базе сервиса $http c Angular.js)

const $host = axios.create({
  baseURL: 'http://localhost:5000/',
})

const $authHost = axios.create({
  baseURL: 'http://localhost:5000/',
})

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }

//Это индекс файл для взаимодействия клиента и сервера
//С помощью метода axios.create создается константа, которая будет передавать URL серверной части магазина
//Далее следует кастомный интерсептор, который перехватывает неавторизованные запросы на сервер при помощи токена, хранящегося в locslStorage (в случае $authHost), по-видимому это функционал axios
