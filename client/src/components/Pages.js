import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { Context } from '..'

const Pages = observer(() => {
  const { device } = useContext(Context)
  const pageCount = Math.ceil(device.totalCount / device.limit) // подсчет количества выводимых страниц, количество всех девайсов, которое берется из контекста (реализован в файле DeviceStore) делится на лимит отображения на странице (берется оттуда же) и округляется в большую сторону метожом Math.ceil
  const pages = [] //пустой массив в который добавляются подсчитанное выше количество выводимых страниц в виде элементов массива

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <Pagination.Item key={page} onClick={() => device.setPage(page)} active={device.page === page}>
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  )
})

export default Pages

//Этот компонент страницы магазина отвечает за постраничный вывод товаров и отрисовывает элемент в виде панели с выбором страницы
//Он реализован так, что количество элементов в этом компоненте зависит от количества загруженных на данный момент товаров (а также лимита отображения этих товаров на одной странице)
//<Pagination.Item> отрисовывается на каждый элемент массива pages, а на клик вешается функция, которая привязывает значение текущий страницы к значению device.page
