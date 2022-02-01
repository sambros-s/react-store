import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createType } from '../../http/deviceAPI'

const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState('')

  const addType = () => {
    createType({ name: value }).then((data) => {
      setValue('')
      onHide()
    })
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Добавить новый тип</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control value={value} onChange={(e) => setValue(e.target.value)} placeholder={'введите название типа'}></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addType}>
          Добавить
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateType

//Это модальное окно позволяет создать новый тип в базе данных. Делается это через функцию createType из файла deviceAPI
