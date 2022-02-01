import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createBrand } from '../../http/deviceAPI'

const CreateBrand = ({ show, onHide }) => {
  const [value, setValue] = useState('')

  const addBrand = () => {
    createBrand({ name: value }).then((data) => {
      setValue('')
      onHide()
    })
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Добавить новый брэнд</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control value={value} onChange={(e) => setValue(e.target.value)} placeholder={'введите название брэнда'}></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addBrand}>
          Добавить
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateBrand

//Это модальное окно позволяет создать новый брэнд в базе данных. Делается это через функцию createBrand из файла deviceAPI
