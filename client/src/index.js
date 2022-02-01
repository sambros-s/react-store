//Основной файл
// Консольные комманды:
//npx create-react-app (разворачивает шаблонное реакт-приложение)
//npm i axios (для отправки запросов на сервер)
//npm i react-router-dom (постраничная навигация)
//npm i mobx mpbx-react-lite (state-менеджер)
//npm i react-bootstrap bootstrap (бутстрап)

import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import DeviceStore from './store/DeviceStore'
import UserStore from './store/UserStore'

export const Context = createContext(null) //контекст для девайсов и юзеров

ReactDOM.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
    }}
  >
    <App />
  </Context.Provider>,

  document.getElementById('root')
)

//Здесь по сути рендериться приложение при помощи ReactDOM.render. Само приложение <App> обернуто в <Context.Provider>, который связывает все приложение с данными девайсов и юзеров, созданными и хранящимися как объекты в файлах DeviceStore и UserStore.
