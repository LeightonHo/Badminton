import React from "react";
import {IState as Props} from "../App";

interface IProps {
    courts: Props["courts"],
    setCourts: React.Dispatch<React.SetStateAction<number>>
}

const CourtForm: React.FC<IProps> = ({ courts, setCourts }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCourts(parseInt(e.target.value))
    }

    return (
        <div>
            Number of courts: 
            <input 
                type="number"
                onChange={handleChange}
            />
        </div>
    )
}

export default CourtForm;