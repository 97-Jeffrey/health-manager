import { FiEdit2 } from "react-icons/fi"
import TooltipGeneral from "../../elements/tooltip/tooltip"
import { formatDate } from "../../lib/util/date"
import { BodySymptomInterface } from "../../types/bodySymptom"
import { useState } from "react"
import BodySymptomDetailModal from "./bodySymptomDetailModal"


interface SymptomCardInterface {
    color: string,
    symptom: BodySymptomInterface,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleSymptomSelect: (id: string)=> void
}

const SymptomCard: React.FC<SymptomCardInterface> = ({ 
    color,
    symptom, 
    setOpen,
    handleSymptomSelect
}) =>{

    const [opendetail, setOpenDetail] = useState<boolean>(false);

    return (
        <>
            <BodySymptomDetailModal
                bodySymptom={symptom}
                open={opendetail}
                setOpen={setOpenDetail}
            />
            <div
                style={{ backgroundColor: color }}
                className={
                    `cursor-pointer rounded-[15px] w-100 min-h-[80px] flex flex-row justify-between gap-[100px] items-center px-[50px] py-[20px] border-[2px] border-black`}
                onClick={()=>{
                    handleSymptomSelect(symptom.id)
                    setOpenDetail(true)
                }}

            >
                <div 
                    
                    className={
                        `w-100 flex flex-row justify-start gap-[100px] items-center`}

                >
                    <div className='font-bold w-[100px]'>
                        {symptom.area}
                    </div>

                    <div className='font-bold w-[100px]'>
                        {symptom.symptom}
                    </div>

                    <div className='font-bold w-[100px]'>
                        Severity: {symptom.rating}
                    </div>

                    <div className='font-bold w-[150px]'>
                        {formatDate(symptom.date)}
                    </div>


                </div>
                <div 
                    className='cursor-pointer'
                    onClick={(e)=>{
                        e.stopPropagation()
                        handleSymptomSelect(symptom.id)
                        setOpen(true)
                    }}
                >
                    <TooltipGeneral 
                        text='Edit the symptom'
                        placement="left"
                    > 
                        <div>
                            <FiEdit2 />
                        </div>
                    </TooltipGeneral>
                </div>
            </div>
        </>
    )
}

export default SymptomCard