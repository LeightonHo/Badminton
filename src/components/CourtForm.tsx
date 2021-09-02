import React from "react";
import {IState as Props} from "../App";

interface IProps {
    courts: Props["courts"],
    setCourts: React.Dispatch<React.SetStateAction<number>>
}

const CourtForm: React.FC<IProps> = ({ courts, setCourts }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const input = parseInt(e.target.value);

        if (!isNaN(input))
        {
            setCourts(input);
        }
    }

    return (
        <div>
            Number of courts: 
            <input 
                type="number"
                value={courts}
                onChange={handleChange}
            />
        </div>
    )
}

export default CourtForm;