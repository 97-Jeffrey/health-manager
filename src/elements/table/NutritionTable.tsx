import React from "react"
import { MicronutrientsInterface } from "../../types/recipe"



interface NutrientsTableInterface {
    micronutrients: MicronutrientsInterface
}

const NutrientsTable: React.FC<NutrientsTableInterface> = ({ micronutrients }) =>{

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Nutrients</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit</th>
                    </tr>
                </thead>

                <tbody>
                   {Object.entries(micronutrients).map(([name, [quantity, unit]]) => (
                        <tr key={name}>
                            <td >{name}</td>
                            <td >{quantity}</td>
                            <td >{unit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )

}


export default NutrientsTable