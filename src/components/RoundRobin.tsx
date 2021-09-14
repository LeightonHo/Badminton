import React, { useState } from "react";
import { IState as Props } from "./Main";
import Bye from "./Bye";
import Match from "./Match";
import { Box, Card, CardContent, Divider, Grid, styled, Typography } from "@material-ui/core";

export interface IProps {
    config: Props["config"],
    gameData: Props["gameData"],
    setGameData: React.Dispatch<React.SetStateAction<Props["gameData"]>>
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

export interface IRound {
    number: number,
    matches: IMatch[],
    byes: Props["config"]["players"]
}

const RoundRobin: React.FC<IProps> = ({ config, gameData, setGameData }) => {

    // const [current, setCurrent] = useState<number>(0);

    const initRoundRobin = (): void => {
        // If there is no game data, generate the brackets.
        if (gameData.length === 0) {
            console.log("Generating brackets.");

            const bracket = generateBracket();

            setGameData(bracket);
        }
    }

    const generateBracket = (): Props["gameData"] => {
        const rounds = config.rounds;
        const bye = config?.players?.length % (config?.courts?.length * 4);
        let playersAlreadyOnBye: Props["config"]["players"] = [];

        // if (config?.courts?.length === 0) {
        //     return (
        //         <div>Enter a court and some players to begin.</div>
        //     );
        // }

        // if (config?.players?.length / 4 < config?.courts?.length) {
        //     return (
        //         <div>There are not enough players for {config?.courts?.length} courts.</div>
        //     );
        // }

        for (let i = 1; i < rounds + 1; i++)
        {
            // Work out who is on bye this round.
            let currentPlayersOnBye: Props["config"]["players"] = [];
            let eligiblePlayers: Props["config"]["players"] = config.players.filter(x => !playersAlreadyOnBye.includes(x));
            let iterations: number = bye;
    
            // If the number of eligible players is less than the number of byes, then we'll need to take all eligible players and then start the process again.
            if (eligiblePlayers.length <= bye)
            {
                iterations = bye - eligiblePlayers.length;
                currentPlayersOnBye = eligiblePlayers;
                playersAlreadyOnBye = eligiblePlayers;
                eligiblePlayers = config.players.filter(x => !playersAlreadyOnBye.includes(x));
            }

            for (let y = 0; y < iterations; y++)
            {
                let player = eligiblePlayers[eligiblePlayers.length * Math.random() | 0];
                // let player = eligiblePlayers[y];
                let indexOfPlayer = eligiblePlayers.indexOf(player);
    
                currentPlayersOnBye.push(player);
                eligiblePlayers.splice(indexOfPlayer, 1);
            }

            playersAlreadyOnBye = playersAlreadyOnBye.concat(currentPlayersOnBye);

            // Pass list of active players into a function for generating the match up
            let currentPlayers: Props["config"]["players"] = config.players.filter(x => !currentPlayersOnBye.includes(x));

            currentPlayers = shuffleArray(currentPlayers);

            const matches: IMatch[] = generateMatches(config.courts, currentPlayers);
            const round: IRound = {
                number: i,
                matches: matches,
                byes: currentPlayersOnBye
            }

            gameData.push(round);
        }

        return gameData;
    }

    const shuffleArray = (array: Props["config"]["players"]): Props["config"]["players"] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    // Function for rendering each match takes in a list of players and generates the bracket
    const generateMatches = (courts: Props["config"]["courts"], players: Props["config"]["players"]): IMatch[] => {
        let result: IMatch[] = []

        for (let i = 0; i < courts.length; i++) {
            const currentPlayers = players.splice(0, 4);
            const match: IMatch = {
                court: courts[i],
                team1: {
                    player1: currentPlayers[0],
                    player2: currentPlayers[1],
                    score: 0
                },
                team2: { 
                    player3: currentPlayers[2],
                    player4: currentPlayers[3],
                    score: 0
                }
            }

            result.push(match);
        }

        return result;
    }
    
    const renderMobileView = () => {
        return (
            <Box>
                {gameData.map((round, roundKey) => {
                    return (
                        <Card 
                            key={roundKey}
                            className="card round-card"
                        >
                            <CardContent>
                                <Grid 
                                    container
                                    direction="column"
                                    className="divRound"
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Typography 
                                            variant="h6"
                                            className="spnGameLabel"
                                            gutterBottom
                                        >
                                            ROUND {round.number}
                                        </Typography>
                                    </Grid>

                                    <Divider />

                                    {round.matches.map((match, matchKey) => {
                                        return (
                                            <Box key={matchKey} className="match-box">
                                                <Grid 
                                                    item xs
                                                    className="match"
                                                >
                                                    <Match match={match} gameData={gameData} setGameData={setGameData} roundKey={roundKey} matchKey={matchKey} />
                                                </Grid>
                                                {addMatchDivider(matchKey, round.matches.length)}
                                            </Box>
                                        );
                                    })}
                                    
                                    <Divider />

                                    <Grid item xs>
                                        <Bye players={round.byes}></Bye>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    );
                })}
            </Box>
        );
    }

    const addMatchDivider = (matchKey: number, totalMatches: number) => {
        if (matchKey !== totalMatches - 1) {
            return (
              <Divider />
            );
        }
    }

    const renderDesktopView = () => {
        return (
            <Box className="games">
                {gameData.map((round, i) => {
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
                                        <Match match={match} gameData={gameData} setGameData={setGameData} roundKey={i} matchKey={j} />
                                    </Grid>
                                );
                            })}
                            
                            <Grid item xs={2}>
                                <Bye players={round.byes}></Bye>
                            </Grid>
                        </Grid>
                    );
                })}
            </Box>
        );
    }

    return (
        <Box>
            {initRoundRobin()}

            {renderMobileView()}
            
            {/* {renderDesktopView()} */}
        </Box>
    );
}

export default RoundRobin;