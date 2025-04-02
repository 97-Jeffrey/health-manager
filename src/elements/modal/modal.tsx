import React, { ReactNode } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface EditModalInterface {
  toDelete: boolean,
  title: string,
  open: boolean,
  handleClose: ()=> void,
  children: ReactNode,
  updateActionText: string,
  deleteActionText: string,
  asyncAction: (e: React.FormEvent)=> Promise<void>,
  asyncDeleteAction? :(e: React.FormEvent)=> Promise<void>,
}

const ToggleModal: React.FC<EditModalInterface> =({ 
  toDelete,
  title, 
  open, 
  handleClose, 
  asyncAction,
  asyncDeleteAction,
  updateActionText,
  deleteActionText,
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

          <Button 
            variant="primary" 
            onClick={(e)=>{
              asyncAction(e)
              handleClose()
            }}
          >
            {updateActionText}
          </Button>

          { toDelete 
              &&
            <Button 
              variant="danger" 
              onClick={(e)=>{
                if(asyncDeleteAction){
                  asyncDeleteAction(e)
                  handleClose()
                }
                else return
              }}
            >
              {deleteActionText}
            </Button>
          }

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ToggleModal;