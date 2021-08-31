import React from "react";
import {IState as Props} from "../App";

interface IProps {
    players: Props["players"]
}

const PlayerList: React.FC<IProps> = ({ players }) => {

    const renderList = (): JSX.Element[] => {
        return players.map((player) => {
            return (
                <div 
                    className="list-item"
                    key={player.name}
                >
                    <span>{player.name} ({player.win}-{player.loss})</span>
                </div>
            )
        })
    }

    return (
        <div>
            {renderList()}
        </div>
    )
}

export default PlayerList;