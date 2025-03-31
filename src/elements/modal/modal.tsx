import React, { ReactNode } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface EditModalInterface {
  title: string,
  open: boolean,
  handleClose: ()=> void,
  children: ReactNode,
  updateActionText: string,
}

const ToggleModal: React.FC<EditModalInterface> =({ 
  title, 
  open, 
  handleClose, 
  updateActionText,
  children })=> {
  


  return (
    <>

      <Modal show={open} onHide={handleClose} className='w-[1200px]'>
        <Modal.Header closeButton>
          <Modal.Title className='font-bold'>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {updateActionText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ToggleModal;