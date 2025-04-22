
import { MdDeleteForever } from "react-icons/md";

interface DeleteInterface {
    onDelete: ()=>void
}

const DeleteIcon: React.FC<DeleteInterface> = ({ onDelete }) =>{
    return (
        <>
            <div onClick={onDelete} className='cursor-pointer w-[40px] h-[40px] bg-red-500 flex flex-row justify-center items-center rounded-lg text-white font-bold'>
                <MdDeleteForever /> 
            </div>
        </>
    )
}

export default DeleteIcon;