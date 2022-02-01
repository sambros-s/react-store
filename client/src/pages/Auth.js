import React, { useContext, useState } from 'react'
import { Card, Container, Form, Button, Row } from 'react-bootstrap'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { useLocation, NavLink, useHistory } from 'react-router-dom'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '..'

const Auth = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const history = useHistory()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }
      user.setUser(user)
      user.setIsAuth(true)
      history.push(SHOP_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control className="mt-2" placeholder="Введите ваш email..." value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
          <Form.Control
            type="password"
            className="mt-2"
            placeholder="Введите пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <div className="d-flex justify-content-between pl-3 pr-3">
            {isLogin ? <div className="mt-4">Нет аккаунта?</div> : <div className="mt-4">Есть аккаунт?</div>}

            {isLogin ? (
              <NavLink className="mt-4" to={REGISTRATION_ROUTE} variant={'outline-success'}>
                Зарегистрируйтесь!
              </NavLink>
            ) : (
              <NavLink className="mt-4" to={LOGIN_ROUTE} variant={'outline-success'}>
                Войдите!
              </NavLink>
            )}
            <Button className="mt-3" variant={'outline-success'} onClick={click}>
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
})

export default Auth
