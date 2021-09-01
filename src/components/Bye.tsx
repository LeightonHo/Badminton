import React from "react";
import { IProps as Props} from "./RoundRobin";

interface IProps {
    players: Props["players"]
}

const Bye: React.FC<IProps> = ({ players }) => {

    return (
        <div>{players.map((player, i) => {
            return (
                <div key={i}>
                    <p>{player.name}</p>
                </div>
            )
        })}</div>
    )
}

export default Bye;