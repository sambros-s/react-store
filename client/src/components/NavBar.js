import React, { useContext } from 'react'
import { Context } from '../index.js'
import { Button, Container, Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { SHOP_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE, BASKET_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import cart2 from '../images/cart2.png'

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const history = useHistory()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: 'white', textDecoration: 'none' }} to={SHOP_ROUTE}>
          Go to Shop
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto">
            <Button variant={'outline-light'} onClick={() => logOut()}>
              Выйти
            </Button>
            <Button variant={'outline-light'} style={{ marginLeft: '10px' }} onClick={() => history.push(ADMIN_ROUTE)}>
              Админ Панель
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant={'outline-light'} onClick={() => history.push(LOGIN_ROUTE)}>
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>

      <NavLink
        to={BASKET_ROUTE}
        style={{ background: `url(${cart2}) no-repeat center`, width: 50, height: 50, backgroundSize: 'cover', marginRight: 40 }}
      ></NavLink>
    </Navbar>
  )
})

export default NavBar

//Компонент <NavBar> обернут в observer, который позволяет синхронизировать состояние строки с тем, что видит юзер
//С помощью хука useHistory() и его метода .push мы переходим на нужную страницу без перезагрузки всего приложения
// В зависимости от того, авторизован пользователь или нет отображается либо кнопки Выйти и Админ Панель, либо кнопка Авторизация с ссылками на соответствующие страницы
//Информация о текущем пользователе берется из контекста, а значит из файла userStore, где хранятся все данные о пользователях
