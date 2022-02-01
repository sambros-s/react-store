import { observer } from 'mobx-react-lite'
import { number } from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { Context } from '../..'
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI'

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context)
  const [info, setInfo] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
    fetchDevices().then((data) => device.setDevices(data.rows))
  }, []) //Здесь подгружаются типы, брэнды и девайсы для модального окна

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  } //Это функция для добавления характеристики. Она открывает существующий массив инфо с помощью конструкции развертывания [...info и через запятую добавляет в него новый объект с пустыми полями, которые впоследствии должны быть заполнены.

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number))
  } //Это функция для удаления характеристик. Она реализована при помощи метода .filter и сравнения number из агрумента, с number из массива info. Обычно вместо number для фильтрации служит id.

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
  } //Эта функция служит для внесения изменений в созданный при помощи addInfo шаблон для создания свойств девайса. Она принимает аргументы: key (это либо title либо description), value (сюда будет передаваться введенное пользователем значение названия или описания характеристики) и number (аналог id). Я не совсем понимаю зачем тут проверка на совпадение number с уже существующим, эти number сгенерированы из текущего времени, поэтому врядли будут совпадать. Кроме того непонятно почему только key в квадратных скобках, а value нет.

  const selectedFile = (e) => {
    setFile(e.target.files[0])
  } //Эта функция присваивает файл изображения создаваемому девайсу. Файл идет под индексом 0 в свойствах таргета. По-видимому это как-то связано с type='file' у Form.Control, которая обращается к этой функции.

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then((data) => onHide())
  } //Эта функция создает новое устройство. Здесь формируется объект formData, который содержит в себе все поля свойств девайса из базы данных в серверной части (имя, цена, изображение и так далее). Ключи этих полей указываются напрямую, а значения берутся из useState-ов, сформированных выше. Метод append добавляет узлы в конец элемента и принимает только строковый формат, именно поэтому значение цены вручную переведено здесь в строку записьью `${price}`.
  //Насколько я понимаю, строчный формат нужен для работы с базами данныхю

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Добавить новое устройство</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="d-flex">
            <Dropdown className="mt-3 mb-2">
              <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
              <Dropdown.Menu>
                {device.types.map((type) => (
                  <Dropdown.Item key={type.id} onClick={() => device.setSelectedType(type)}>
                    {type.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div className="mt-4" style={{ marginLeft: 20 }}>
              {device.selectedType.name || 'Не выбран'}
            </div>
          </div>
          <div className="d-flex">
            <Dropdown className="mt-3 mb-2">
              <Dropdown.Toggle>Выберите брэнд</Dropdown.Toggle>
              <Dropdown.Menu>
                {device.brands.map((brand) => (
                  <Dropdown.Item key={brand.id} onClick={() => device.setSelectedBrand(brand)}>
                    {brand.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div className="mt-4" style={{ marginLeft: 20 }}>
              {device.selectedBrand.name || 'Не выбран'}
            </div>
          </div>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} className="mt-3" placeholder="Введите название устройства"></Form.Control>
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Введите цену устройства"
            type="number"
          ></Form.Control>
          <Form.Control className="mt-3" placeholder="Загрузите изображение устройства" type="file" onChange={selectedFile}></Form.Control>
          <hr />
          <Button onClick={addInfo}> Добавить новое свойство </Button>
          {info.map((i) => (
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                  placeholder="Введите название свойства"
                ></Form.Control>
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                  placeholder="Введите описание свойства"
                ></Form.Control>
              </Col>
              <Col md={4}>
                <Button variant={'outline-danger'} onClick={() => removeInfo(i.number)}>
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice

//Это модальное окно позволяет создать новый девайс в базе данных.
//onHide и show, насколько я понимаю, встроенные функции бутстрапа
