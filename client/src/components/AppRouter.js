import React, { useContext, useLayoutEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Context } from '../index.js'
import { authRoutes, publicRoutes } from '../routes'
import { SHOP_ROUTE } from '../utils/consts'

const AppRouter = () => {
  const { user } = useContext(Context)
  return (
    <Switch>
      {user.isAuth && authRoutes.map(({ path, Component }) => <Route key={path} path={path} component={Component} exact></Route>)}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact></Route>
      ))}
      <Redirect to={SHOP_ROUTE}></Redirect>
    </Switch>
  )
}

export default AppRouter

// <Switch>  в комбинации с <Redirect> позволяет переадресовать несуществующий адрес на главную страницу
// <Route>  это объект, который позволяет создать маршрут, он принимает в себя атрибут path - отсылает к адресу в строке URL и атрибут component - собственно компонент, который будет отрисовываться по этому адресу
//В данном случае компонент пробегается методом .map по всем существующим authRoutes (авторизованным маршрутам) и publicRoutes (публичным маршрутам) из файла routes и отрисовывает маршрут для каждого из этих компонентов
