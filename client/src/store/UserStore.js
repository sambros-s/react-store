import { makeAutoObservable } from 'mobx'

export default class UserStore {
  constructor() {
    this._isAuth = true
    this._user = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }

  setUser(user) {
    this._user = user
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }
}

//Хранилище информации о юзерах для последующего импорта с помощью useContext !ВНИМАНИЕ! сюда можно по идее добавить информацию о роли пользователя, чтобы отделить админов от юзеров
