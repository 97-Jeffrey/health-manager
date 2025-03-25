import * as STYLES from '../../constants/styles'

interface TagInterface {
    text: string;
    toDelete: boolean;
    onDelete?: ()=>void
}

const Tag: React.FC<TagInterface> = ({ text, toDelete, onDelete }) =>{
    return (
        <>
            <div
                className={STYLES.RECIPE_TAG}
            >
                <span>{text}</span>
                
                {toDelete 
                     &&
                <svg onClick={onDelete} className='size-6 cursor-pointer' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                }
            </div>
        </>
    )
}

export default Tag;