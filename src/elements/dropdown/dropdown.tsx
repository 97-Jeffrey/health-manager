import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';


interface DropdownInterface {
    data: string[]
}


const DropDown: React.FC<DropdownInterface> = ({
    data
}) =>{
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='w-100 bg-white text-black'>
                    Body
                </Dropdown.Toggle>

                <Dropdown.Menu className='w-100'>
                    {data.map((each, index)=>(
                        <Dropdown.Item key={index}>{each}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}


export default DropDown