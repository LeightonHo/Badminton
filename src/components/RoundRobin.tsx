import React from "react";
import {IState as Props} from "../App";

interface IProps {
    courts: Props["courts"],
    players: Props["players"]
}

const RoundRobin: React.FC<IProps> = ({ courts, players }) => {

    const generateBracket = (): string => {
        let playersAlreadyOnBye: IProps["players"] = [];
        const courts = 1;
        const matches = 10;
        const bye = players.length % (courts * 4);
        let result = "";

        console.log(players.length, courts, bye);

        // loop for the number of matches
        for (let i = 1; i < matches + 1; i++)
        {
            // Work out who is on bye this round.
            let currentPlayersOnBye: IProps["players"] = [];
            let eligiblePlayers: IProps["players"] = players.filter(x => !playersAlreadyOnBye.includes(x));
            let iterations: number = bye;
    
            // If the number of eligible players is less than the number of byes, then we'll need to take all eligible players and then start the process again.
            if (eligiblePlayers.length <= bye)
            {
                iterations = bye - eligiblePlayers.length;
                currentPlayersOnBye = eligiblePlayers;
                playersAlreadyOnBye = eligiblePlayers;
                eligiblePlayers = players.filter(x => !playersAlreadyOnBye.includes(x));
            }

            for (let y = 0; y < iterations; y++)
            {
                let player = eligiblePlayers[eligiblePlayers.length * Math.random() | 0];
                let indexOfPlayer = eligiblePlayers.indexOf(player);
    
                currentPlayersOnBye.push(player);
                eligiblePlayers.splice(indexOfPlayer, 1);
            }

            playersAlreadyOnBye = playersAlreadyOnBye.concat(currentPlayersOnBye);

            // Pass list of active players into a function for generating the match up
            let currentPlayers: IProps["players"] = players.filter(x => !currentPlayersOnBye.includes(x));

            currentPlayers = shuffleArray(currentPlayers);

            console.log(`Match: ${i}, Players: ${currentPlayers}, Bye: ${currentPlayersOnBye}`);
        }

        return result;
    }

    const shuffleArray = (array: IProps["players"]): IProps["players"] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    // Function for rendering each match takes in a list of players and generates the bracket

    const renderPlayers = () => {
        return (
            <div>
                {players.map((player, i) => {
                    return (
                        <div key={i}>
                            {player.name}
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div>
            This is the round robin list.
            {generateBracket()}
            {renderPlayers()}
        </div>
    )
}

export default RoundRobin;