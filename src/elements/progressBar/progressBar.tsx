import ProgressBar from 'react-bootstrap/ProgressBar';

interface ProgressInterface{
  value: number,
  onChange:(rating: number) => void
}

const Progress: React.FC<ProgressInterface> = ({ value, onChange })=> {


  const increaseProgress = () => {
    onChange(Math.min(value + 1, 10)); // Increase by 10%, max 100%
  };

  const decreaseProgress = () => {
    onChange(Math.max(value - 1, 0)); // Increase by 10%, max 100%
  };
  return (
    <div
        className='cursor-pointer flex flex-row gap-2 items-center'
    >
        <button onClick={decreaseProgress} className='bg-black text-white rounded-lg w-[12px] h-[35px] flex flex-row justify-center items-center'>-</button>
        <ProgressBar className='w-100' now={value} max={10} />
        <button onClick={increaseProgress} className='bg-black text-white rounded-lg w-[12px] h-[35px] flex flex-row justify-center items-center'> + </button>
    </div>
  )
}

export default Progress;