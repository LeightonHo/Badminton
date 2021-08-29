import React from "react";
import {IState as Props} from "../App";

interface IProps {
    courts: Props["courts"],
    players: Props["players"]
}

const RoundRobin: React.FC<IProps> = ({ courts, players }) => {

    // Leighton, Seth, JB, 

    const generateBracket = () => {

    }

    return (
        <div>
            This is the round robin list.
        </div>
    )
}

export default RoundRobin;