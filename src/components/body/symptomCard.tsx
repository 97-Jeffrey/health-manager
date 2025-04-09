import { formatDate } from "../../lib/util/date"
import { BodySymptomInterface } from "../../types/bodySymptom"


interface SymptomCardInterface {
    color: string,
    symptom: BodySymptomInterface,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleSymptomSelect: (id: string)=> void
}

const SymptomCard: React.FC<SymptomCardInterface> = ({ 
    color,
    symptom, 
    setOpen ,
    handleSymptomSelect
}) =>{

    return (
        <>
            <div 
                style={{ backgroundColor: color }}
                className={
                    `cursor-pointer rounded-[15px] w-100 min-h-[80px] flex flex-row justify-around items-center p-2 border-[2px] border-black`}
                onClick={()=>{
                    handleSymptomSelect(symptom.id)
                    setOpen(true)
                }}

                >
                <div className='font-bold'>
                    {symptom.area}
                </div>

                <div className='font-bold'>
                    {symptom.symptom}
                </div>

                <div className='font-bold'>
                    Severity: {symptom.rating}
                </div>

                <div className='font-bold'>
                    {formatDate(symptom.date)}
                </div>

            </div>
        </>
    )
}

export default SymptomCard