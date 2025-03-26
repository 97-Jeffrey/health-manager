

interface DeleteInterface {
    onDelete: ()=>void
}

const DeleteIcon: React.FC<DeleteInterface> = ({ onDelete }) =>{
    return (
        <>
            <div onClick={onDelete} className='cursor-pointer w-[40px] h-[40px] bg-red-500 flex flex-row justify-center items-center rounded-lg text-white font-bold'>X</div>
        </>
    )
}

export default DeleteIcon;