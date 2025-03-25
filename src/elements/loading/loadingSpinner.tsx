import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

interface LoadingSpinnerInterface {
  text: string
}

const  LoadingSpinner: React.FC<LoadingSpinnerInterface>=({ text }) =>{
  return (
    <>
      <div className='flex flex-row justify-center items-center gap-3 text-[25px]'>
        <Spinner animation="border" role="status">
          <span className="visually-hidden"></span>

        </Spinner>
        <div className='font-bold'>{text}</div>
      </div>
    </>
  );
}

export default LoadingSpinner;