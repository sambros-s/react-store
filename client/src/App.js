import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import { Context } from '.'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { check } from './http/userAPI'

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(true)
        user.setIsAuth(true)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={'grow'}></Spinner>
  }

  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <AppRouter></AppRouter>
    </BrowserRouter>
  )
})

export default App

//Здесь при помощи хука useEffect вызвана функция check из файла userAPI, которая проверяет авторизован ли пользователь. Она вызывается единожды при загрузке страницы.
//App разбит на компоненты <NavBar> (навигационная панель) и <AppRouter>(собственно тело страницы, которое меняется в зависимости от адреса URL)
//Эти компоненты обернуты в <BrowserRouter>, компонент позволяющий осуществлять навигацию без перезагрузок страницы
