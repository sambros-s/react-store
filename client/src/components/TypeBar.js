import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import { ListGroup } from 'react-bootstrap'

const TypeBar = observer(() => {
  const { device } = useContext(Context)
  return (
    <ListGroup>
      {device.types.map((type) => (
        <ListGroup.Item style={{ cursor: 'pointer' }} active={type.id === device.selectedType.id} onClick={() => device.setSelectedType(type)} key={type.id}>
          {type.name}
        </ListGroup.Item>
      ))}
      <ListGroup.Item style={{ cursor: 'pointer' }} active={!device.selectedType.id} onClick={() => device.setSelectedType({})}>
        Выбрать все
      </ListGroup.Item>
    </ListGroup>
  )
})

export default TypeBar

//Этот компонент отрисовывает панель типов при помощи метода map по device.types из контекста, куда они помещаются запросом fetchTypes на главной странице магазина
//На клик вешается функция, которая привязывает значение выбранной кликом страницы к значению selectedType в контексте
//Кнопка выбрать все реализована при помощи присвваивания selectedType из контекста значения пустого объекта
