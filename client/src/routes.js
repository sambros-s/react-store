import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Basket from './pages/Basket'
import DevicePage from './pages/DevicePage'
import Shop from './pages/Shop'
import { ADMIN_ROUTE, BASKET_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, DEVICE_ROUTE } from './utils/consts'

export const authRoutes = [
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
]

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: DEVICE_ROUTE + '/:id',
    Component: DevicePage,
  },
]

//Здесь хранится список маршрутов для подгрузки в компонент <Rout>  в файле AppRouter. Это массив, состоящий из объектов, в каждом из которых есть поле path с адресом строки URL и поле Component, представляющее из себя ссылку на файл компонента
