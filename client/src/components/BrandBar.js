import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card, Row } from 'react-bootstrap'
import { Context } from '..'

const BrandBar = observer(() => {
  const { device } = useContext(Context)
  return (
    <div className="d-flex">
      {device.brands.map((brand) => (
        <Card
          style={{ cursor: 'pointer' }}
          key={brand.id}
          className="p-3"
          onClick={() => device.setSelectedBrand(brand)}
          border={brand.id === device.selectedBrand.id ? 'primary' : 'none'}
        >
          {brand.name}
        </Card>
      ))}
      <Card style={{ cursor: 'pointer' }} className="p-3" onClick={() => device.setSelectedBrand({})} border={device.selectedBrand.id ? 'none' : 'primary'}>
        Все
      </Card>
    </div>
  )
})

export default BrandBar

//Этот компонент отрисовывает панель типов при помощи метода map по device.brands из контекста, куда они помещаются запросом fetchBrands на главной странице магазина
//На клик вешается функция, которая привязывает значение выбранной кликом страницы к значению selectedBrand в контексте
//Кнопка все реализована при помощи присвваивания selectedBrand из контекста значения пустого объекта
