import React from "react";
import {IState as Props} from "../App";

interface IProps {
    courts: Props["courts"],
    players: Props["players"]
}

const RoundRobin: React.FC<IProps> = ({ courts, players }) => {

    const generateBracket = (): string => {
        const players = [1, 2, 3, 4, 5];
        let activePlayers = [];
        let playersAlreadyOnBye: number[] = [];
        const courts = 1;
        const matches = 10;
        const bye = players.length % (courts * 4);
        let result = "";

        console.log(players.length, courts, bye);

        // loop for the number of matches
        for (let i = 0; i < matches; i++)
        {
            let playersOnBye = [];
            // randomly select players to be on bye
            // if playersOnBye is full, then refresh and start again
            playersOnBye = selectPlayersOnBye(players, playersAlreadyOnBye, bye)

            playersAlreadyOnBye = playersAlreadyOnBye.concat(playersOnBye);

            // pass list of active players into a function for generating the match up
        }

        return result;
    }

    const selectPlayersOnBye = (players: number[], playersAlreadyOnBye: number[], bye: number): number[] => {
        let result: number[] = [];
        let eligiblePlayers: number[] = players.filter(x => !playersAlreadyOnBye.includes(x));

        for (let i = 0; i < bye; i++)
        {
            let player = eligiblePlayers[eligiblePlayers.length * Math.random() | 0];
            let indexOfPlayer = eligiblePlayers.indexOf(player);

            result.push(player);
            eligiblePlayers.splice(indexOfPlayer, 1);
        }

        console.log(eligiblePlayers);
        console.log(result);

        return [];
    }

    return (
        <div>
            This is the round robin list.
            {generateBracket()}
        </div>
    )
}

export default RoundRobin;