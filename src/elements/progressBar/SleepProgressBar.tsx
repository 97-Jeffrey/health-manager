import ProgressBar from 'react-bootstrap/ProgressBar';

interface SleepProgressInterface{
  value: number,
  name: string, 
  onChange:(name: string, rating: number) => void
}

const SleepProgress: React.FC<SleepProgressInterface> = ({name, value, onChange })=> {


  const increaseProgress = () => {
    onChange(name, Math.min(value + 1, 10)); // Increase by 10%, max 100%
  };

  const decreaseProgress = () => {
    onChange(name, Math.max(value - 1, 0)); // Increase by 10%, max 100%
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

export default SleepProgress;