import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Context } from '..'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import Pages from '../components/Pages'
import TypeBar from '../components/TypeBar'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'

const Shop = observer(() => {
  const { device } = useContext(Context)

  // Этот useEffect подгружает типы, брэнды и девайсы с сервера при помощи функций fetchTypes, fetchBrands и fetchDevices из файла deviceApi и передает их на клиент в контекст при помщи set-еров (описаны в файле DeviceStore). При этом используется метод .then, для того чтобы процесс запустился после того, как будет получен ответ с сервера.
  // Функция fetchDevices дополнительно принимает в себя параметры typeId (позволяет отфильтровать товары по типам) brandId (по брэндам), page (текущая страница) и limit (число отображаемых товаров на странице)

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
    fetchDevices(null, null, 1, 8).then((data) => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [])

  // Этот useEffect перегружает девайсы при смене страницы и нажатии на брэнд или тип (что можно увидеть в списке зависимостей)

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 8).then((data) => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedType, device.selectedBrand])

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar></TypeBar>
        </Col>
        <Col md={9}>
          <BrandBar></BrandBar>
          <DeviceList></DeviceList>
          <Pages></Pages>
        </Col>
      </Row>
    </Container>
  )
})

export default Shop

// Shop - главная страница магазина, включает интерактивные компоненты <TypeBar>, <BrandBar>,<DeviceList> и <Pages>
