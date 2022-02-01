import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Button, Container, Image, ListGroup, Row } from 'react-bootstrap'
import { Context } from '..'

const Basket = observer(() => {
  const { device } = useContext(Context)
  let sum = 0

  return device.cartDevices.length === 0 ? (
    <h2>Ваша корзина пуста</h2>
  ) : (
    <Container>
      <ListGroup className="mt-5" style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
        {device.cartDevices.map((item) => (
          <ListGroup.Item key={item.id} style={{ height: 55 }}>
            <Row>
              <Image style={{ width: 'auto', height: 40 }} src={'http://localhost:5000/' + item.img}></Image>
              {item.name}
              {'  '}
              {item.price}
              {'   грн.'}
              <div style={{ display: 'none' }}>{(sum = sum + Number(item.price))}</div>
              <Button
                style={{ width: 150, position: 'absolute', right: 5 }}
                variant={'outline-danger'}
                onClick={() => {
                  const newCart = device.cartDevices.filter((d) => d.id !== item.id)
                  device.setCartDevices(newCart)
                }}
              >
                Удалить товар
              </Button>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Row style={{ position: 'absolute', marginTop: 20, right: '30%' }}>{sum} грн.</Row>
      <Row style={{ marginTop: 60, display: 'flex', justifyContent: 'center' }}>
        <Button variant="outline-dark" style={{ width: 200 }}>
          Продолжить покупки
        </Button>
        <Button variant="outline-success" style={{ width: 200 }}>
          Оформить заказ
        </Button>
      </Row>
    </Container>
  )
})

export default Basket
