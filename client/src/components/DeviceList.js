import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Row } from 'react-bootstrap'
import { Context } from '..'
import DeviceItem from './DeviceItem'

const DeviceList = observer(() => {
  const { device } = useContext(Context)
  return (
    <Row className="d-flex">
      {device.devices.map((item) => (
        <DeviceItem key={item.id} item={item}></DeviceItem>
      ))}
    </Row>
  )
})

export default DeviceList

//Этот компонент отрисовывает список девайсов из контекста, методом map он пробегается по полю devices, объект device и на каждый такой девайс отрисовывает карточку описанную в файле DeviceItem
