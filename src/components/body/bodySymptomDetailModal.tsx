import React from "react"
import { BodySymptomInterface } from "../../types/bodySymptom"
import { Modal } from "react-bootstrap"
import { IoIosClose } from "react-icons/io"
import { formatDate } from "../../lib/util/date"

interface bodySymptomDetailModalInterface {
    bodySymptom: BodySymptomInterface,
    open: boolean,
    setOpen: (state: boolean)=> void

}

const BodySymptomDetailModal: React.FC<bodySymptomDetailModalInterface> = ({
    bodySymptom,
    open,
    setOpen
}) =>{
    return (
        <>
            <Modal
                show={open}
                onHide={() => setOpen(false)}
                size="lg"  // This makes the modal large
                aria-labelledby="contained-modal-title-vcenter"
                centered 
            >
                <Modal.Body>
                    <div className='flex flex-row justify-between items-center'>
                        <h4 className='font-bold'>{bodySymptom.mainPart} Symptom Details At {formatDate(bodySymptom.date)}</h4>
                        <IoIosClose  
                            className='text-[30px] cursor-pointer'
                            onClick={()=>setOpen(false)}
                        />
                    </div>

                    <div className='font-bold mt-[20px]'>
                        Area - <span className='bg-black text-white px-[20px] py-[6px] rounded-[10px]'>{bodySymptom.area}</span>
                    </div>

                    <div className='font-bold  mt-[20px]'>
                        Issue - <span className='bg-black text-white px-[20px] py-[6px] rounded-[10px]'>{bodySymptom.symptom}</span>
                    </div>

                    <div className=' mt-[20px]'>
                        <div className="font-bold">Note: </div>
                        <div>{bodySymptom.description}</div>
                    </div>

                    {
                    bodySymptom.image
                       &&
                    <img 
                        src={bodySymptom.image}
                        alt={`${bodySymptom.area} image`}
                        className="mt-[20px] w-50 rounded-[20px] object-cover"
                    />
                    }

        

                
                </Modal.Body>
            </Modal>
        </>
    )
}


export default BodySymptomDetailModal