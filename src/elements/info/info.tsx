
interface infoInterface {
    text: string
}

const Info: React.FC<infoInterface> = ({ text }) =>{
    return (
        <>
           <div className='font-bold bg-[#edebeb] w-100 rounded-[15px] p-3'>{text}</div>
        </>
    )
}

export default Info;