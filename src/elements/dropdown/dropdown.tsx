import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';


interface DropdownInterface {
    data: string[],
    name: string,
    value: string,
    onChange: (name: string, value:string | null)=> void

}


const DropDown: React.FC<DropdownInterface> = ({
    data,
    name,
    value,
    onChange
}) =>{

    return (
        <>
            <Dropdown onSelect={e=>onChange(name, e)}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='w-100 bg-white text-black'>
                    {value}
                </Dropdown.Toggle>

                <Dropdown.Menu className='w-100 max-h-[300px] overflow-y-scroll'>
                    {data.map((each, index)=>(
                        <Dropdown.Item
                            key={index}
                            eventKey={each} 
                        >
                            {each}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}


export default DropDown