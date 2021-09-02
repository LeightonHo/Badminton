import React from "react";
import {IState as Props} from "../App";
import Bye from "./Bye";
import Match from "./Match";
import { Box, Button, Grid } from "@material-ui/core";

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

interface IRound {
    number: number,
    matches: IMatch[],
    byes: Props["players"]
}

const RoundRobin: React.FC<IProps> = ({ courts, players }) => {

    const generateBracket = () => {
        let result: IRound[] = [];
        const matches = 10;
        const bye = players.length % (courts * 4);
        let playersAlreadyOnBye: IProps["players"] = [];

        if (players.length / 4 < courts) {
            return (
                <div>There are not enough players for {courts} courts.</div>
            )
        }

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
            const round: IRound = {
                number: i,
                matches: matches,
                byes: currentPlayersOnBye
            }

            result.push(round);
        }

        console.log(result);

        return (
            <Box>
                {result.map((round, i) => {
                    return (
                        <Grid 
                            key={i}
                            container
                            direction="row"
                            className="divRound"
                            spacing={2}
                        >
                            <Grid item xs={1}>
                                <span className="spnGameLabel">{round.number}</span>
                            </Grid>
                            
                            {round.matches.map((match, j) => {
                                return (
                                    <Grid 
                                        key={j}
                                        item 
                                        xs
                                        className="match"
                                    >
                                        <Match match={match}/>
                                    </Grid>
                                )
                            })}
                            
                            <Grid item xs={2}>
                                <Bye players={round.byes}></Bye>
                            </Grid>
                        </Grid>
                    )
                })}
            </Box>
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
                court: i.toString(),
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

    return (
        <Grid
            direction="row"
            justifyContent="space-evenly"
        >
            {generateBracket()}
        </Grid>
    )
}

export default RoundRobin;