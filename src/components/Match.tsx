import React from "react";
import { IMatch } from "./RoundRobin";

interface IProps {
    match: IMatch
}

const Match: React.FC<IProps> = ({ match }) => {
    return (
        <div className="divMatch">
            <div className="divTeamA">
                <span>{match.team1.player1}</span>
                <span>{match.team1.player2}</span>
                <input 
                    type="number"
                    min="0"
                    max="21"
                />
            </div>
            <div className="divTeamB">
                <span>{match.team2.player3}</span>
                <span>{match.team2.player4}</span>
                <input 
                    type="number"
                    min="0"
                    max="21"
                />
            </div>
        </div>
    )
}

export default Match;