import React from "react";
import {IMatch} from "./RoundRobin";

interface IProps {
    match: IMatch
}

const Match: React.FC<IProps> = ({ match }) => {
    return (
        <div>
            {match.team1.player1}, {match.team1.player2} vs {match.team2.player3}, {match.team2.player4}
        </div>
    )
}

export default Match;