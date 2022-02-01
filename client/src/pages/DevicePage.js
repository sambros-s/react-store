import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import bigstar from '../images/bigstar.png'
import { useParams, useHistory } from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceAPI'
import { BASKET_ROUTE } from '../utils/consts'
import { Context } from '..'

const DevicePage = () => {
  const [info, setInfo] = useState({ info: [] })
  const { id } = useParams()
  const history = useHistory()
  const { device } = useContext(Context)

  useEffect(() => {
    fetchOneDevice(id).then((data) => setInfo(data))
  }, [])

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={'http://localhost:5000/' + info.img}></Image>
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{info.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ background: `url(${bigstar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
            >
              {info.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
          >
            <h3>От: {info.price} руб.</h3>
            <Button
              variant={'outline-success'}
              onClick={() => {
                device.devices.map((item) => {
                  item.id === info.id && device.setCartDevices([...device.cartDevices, item])
                  console.log(device.cartDevices)
                })
              }}
            >
              Добавить в корзину
            </Button>
            <Button variant={'outline-dark'} onClick={() => history.push(BASKET_ROUTE)}>
              Просмотреть корзину
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {info.info.map((info, index) => (
          <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  )
}

export default DevicePage

//Это индивидуальная страница товара. При отрисовке этой страницы, данные напрямую запрашиваются с сервера с помощью метода fetchOneDevice из deviceAPI, а не берутся из контекста (setDevice тоже берется из хука useState и не имеет никакого отношения к контексту). Делается это единожды, при загрузке страницы с помощью хука useEffect()
//Хук useParams берет данные из строки URL, в данном случае он нужен, чтобы получить id устройства, которое отрисовывается в данный момент
