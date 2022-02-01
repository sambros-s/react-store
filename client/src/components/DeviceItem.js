import React, { useContext } from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import star from '../images/star.png'
import { useHistory } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'
import { Context } from '..'

const DeviceItem = ({ item }) => {
  const history = useHistory()
  const { device } = useContext(Context)

  return (
    <Col md={3} onClick={() => history.push(DEVICE_ROUTE + '/' + item.id)}>
      <Card style={{ width: 150, cursor: 'pointer', marginTop: 30 }}>
        <Image width={150} height={150} src={'http://localhost:5000/' + item.img}></Image>
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>
            {device.brands.map((brand) => (
              <div key={brand.id}> {brand.id === item.brandId && brand.name}</div>
            ))}
          </div>
          <div className="d-flex align-items-center">
            <div>{item.rating}</div>
            <Image style={{ width: 14, height: 'auto' }} src={star}></Image>
          </div>
        </div>
        <div>{item.name}</div>
      </Card>
    </Col>
  )
}

export default DeviceItem

//Это компонент, ответственный за отрисовку индивидуального товара в списке. onClick на корневом элементе с помощью хука useHistory() отсылает на страничку обрабатываемую файлом DevicePage (полностраничная индивидуальная презентация каждого товара)
//Этот компонент принимает в себя аргумент device из файла DeviceList, а не из контекста на прямую. Этот аргумент получается из device.devices, а не просто из device, именнно поэтому не получается вставить динамичное название брэнда в описание карточки. Возможно это получится решить переименовав аргумент device в item и использовать хук useContext
//У меня получилось заменить совпадающее название с device на item и отфильтровать массив из контекста сравнив его с текущим значением, чтобы вывести имя брэнда для текущего девайса!
//Картинка в карточку подгружается напрямую из базы данных сервера
