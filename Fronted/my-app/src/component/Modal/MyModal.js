import React from 'react'
import Modal from 'react-bootstrap/Modal'

const MyModal = (props) => {
  const { show, handleClose, title, children } = props

  return (
      <div>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  {children}
              </Modal.Body>
          </Modal>
      </div>
  )
}

export default MyModal