import React from "react";
import { IProps as Props} from "./RoundRobin";

interface IProps {
    players: Props["players"]
}

const Bye: React.FC<IProps> = ({ players }) => {

    return (
        <div className="divBye">{players.map((player, i) => {
            return (
                <div key={i}>
                    <span>{player.name}</span>
                </div>
            )
        })}</div>
    )
}

export default Bye;