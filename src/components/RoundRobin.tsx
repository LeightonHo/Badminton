import React from "react";
import {IState as Props} from "../App";
import Bye from "./Bye";
import Match from "./Match";

export interface IProps {
    courts: Props["courts"],
    players: Props["players"]
}

export interface IMatch {
    court: string,
    team1: {
        player1: string,
        player2: string,
        score: number
    },
    team2: {
        player3: string,
        player4: string,
        score: number
    }
}

interface ITimeslot {
    game: number,
    matches: IMatch[],
    byes: Props["players"]
}

const RoundRobin: React.FC<IProps> = ({ courts, players }) => {

    const generateBracket = () => {
        let result: ITimeslot[] = [];
        const courts = 1;
        const matches = 10;
        const bye = players.length % (courts * 4);
        let playersAlreadyOnBye: IProps["players"] = [];

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

            const matches: IMatch[] = generateMatches(courts, currentPlayers);
            const timeslot: ITimeslot = {
                game: i,
                matches: matches,
                byes: currentPlayersOnBye
            }

            result.push(timeslot);
        }

        console.log(result);

        return (
            <div>
                {result.map((timeslot, i) => {
                    return (
                        <div key={i}>
                            Game {timeslot.game}
                            {timeslot.matches.map((match, j) => {
                                return (
                                    <Match key={j} match={match}/>
                                )
                            })}
                            <Bye players={timeslot.byes}></Bye>
                        </div>
                    )
                })}
            </div>
        )
    }

    const shuffleArray = (array: IProps["players"]): IProps["players"] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    // Function for rendering each match takes in a list of players and generates the bracket
    // TODO: courts should be an array of actual court numbers
    const generateMatches = (courts: number, players: IProps["players"]): IMatch[] => {
        let result: IMatch[] = []

        for (let i = 0; i < courts; i++) {
            const currentPlayers = players.splice(0, 4);
            const match: IMatch = {
                court: "1",
                team1: {
                    player1: currentPlayers[0].name,
                    player2: currentPlayers[1].name,
                    score: 0
                },
                team2: { 
                    player3: currentPlayers[2].name,
                    player4: currentPlayers[3].name,
                    score: 0
                }
            }

            result.push(match);
        }

        return result;
    }

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
            {generateBracket()}
        </div>
    )
}

export default RoundRobin;