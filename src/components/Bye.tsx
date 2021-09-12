import React from "react";
import { IState as Props} from "./Main";

interface IProps {
    players: Props["config"]["players"]
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
    );
}

export default Bye;