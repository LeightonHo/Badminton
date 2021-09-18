import React from "react";
import { IState as Props } from "./Main";
import Bye from "./Bye";
import Match from "./Match";
import { Box, Card, CardContent, Divider, Grid, Typography } from "@material-ui/core";
import { join } from "path";
import PlayerForm from "./PlayerForm";
import PlayerList from "./PlayerList";

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

    const initRoundRobin = (): void => {
        // If there is no game data, generate the brackets.
        if (gameData.length === 0 || true === true) {
            const bracket = generateBracket();

            setGameData(bracket);
        }
    }

    let playerDictionary: { [name: string]: string[] } = { }

    const generateBracket = (): Props["gameData"] => {
        const rounds = config.rounds;
        const bye = config.players.length - (config.courts.length * 4);
        let playersAlreadyOnBye: Props["config"]["players"] = [];
        
        for (let i = 0; i < config.players.length; i++) {
            playerDictionary[config.players[i]] = [...config.players];
            playerDictionary[config.players[i]].splice(i, 1);
        }

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
                // let player = eligiblePlayers[eligiblePlayers.length * Math.random() | 0];
                let player = eligiblePlayers[y];
                let indexOfPlayer = eligiblePlayers.indexOf(player);
    
                currentPlayersOnBye.push(player);
                eligiblePlayers.splice(indexOfPlayer, 1);
            }

            playersAlreadyOnBye = playersAlreadyOnBye.concat(currentPlayersOnBye);

            // Pass list of active players into a function for generating the match up
            let currentPlayers: Props["config"]["players"] = config.players.filter(x => !currentPlayersOnBye.includes(x));

            // currentPlayers = shuffleArray(currentPlayers);

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

    const shuffleArray = (array: any): any[] => {
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
            let currentPlayers: string[] = [];

            // Keep snapshot of current playerDictionary?
            // const playerDictionaryBackup = { ...playerDictionary };

            // While currentPlayers.length < courts.length * 4
            // if counter is > 0 (not the first run), then reshuffle everyone's partner list?

            // Algorithm for taking the players, and then making sure there's a combination that hasn't played yet?
            // loop through players sorted by length of player pool
            players.sort((a, b) => {
                return playerDictionary[a].length - playerDictionary[b].length;
            });

            let counter = 0;

            // Rollback changes and start again
            // playerDictionary = { ...playerDictionaryBackup };

            for (let j = 0; j < players.length; j++) {
                if (currentPlayers.length === courts.length * 4) {
                    console.log(`${courts.length * 4} players found.`)
                    break;
                }

                let currentPlayer = players[j];
                console.log(`Finding a partner for ${currentPlayer}`);

                // For each player, find a team mate which they haven't played together yet.
                if (currentPlayers.indexOf(currentPlayer) >= 0) {
                    // Already selected, check next player.
                    console.log(`${currentPlayer} has already been selected`);
                    continue;
                }
                
                // If there's no one left in the pool, then re-add all players to the list.
                // if (playerDictionary[currentPlayer].every(val => ))

                if (playerDictionary[currentPlayer].length === 1 && players.indexOf(playerDictionary[currentPlayer][0]) < 0) {
                    playerDictionary[currentPlayer] = [...config.players];
                    playerDictionary[currentPlayer].splice(playerDictionary[currentPlayer].indexOf(currentPlayer), 1);
                }

                playerDictionary[currentPlayer] = shuffleArray(playerDictionary[currentPlayer]);

                for (let k = 0; k < playerDictionary[currentPlayer].length; k++) {

                    console.log("Available partners: " + playerDictionary[currentPlayer]);

                    // For each player they haven't played with, check if they're already in the current pool.
                    let currentPartner = playerDictionary[currentPlayer][k];

                    if (currentPlayers.indexOf(currentPartner) >= 0 || players.indexOf(currentPartner) < 0) {
                        // Already selected, check next partner;
                        continue;
                    }

                    console.log(`${currentPlayer} selected ${currentPartner}`);

                    currentPlayers.push(currentPlayer);
                    currentPlayers.push(currentPartner);

                    // Remove partner from the current player's pool.
                    playerDictionary[currentPlayer].splice(k, 1);

                    console.log(`${currentPlayer}'s new partner list: ${playerDictionary[currentPlayer]}`)

                    // Refresh the list of partners if the player's partner list is empty;
                    if (playerDictionary[currentPlayer].length === 0) {
                        playerDictionary[currentPlayer] = [...config.players];
                        playerDictionary[currentPlayer].splice(playerDictionary[currentPlayer].indexOf(currentPlayer), 1);
                        playerDictionary[currentPlayer].splice(playerDictionary[currentPlayer].indexOf(currentPartner), 1);
                        console.log(`${currentPlayer}'s new partner list: ${playerDictionary[currentPlayer]}`)
                    } 
                    
                    // Remove player from partner's pool.
                    playerDictionary[currentPartner].splice(playerDictionary[currentPartner].indexOf(currentPlayer), 1);

                    if (playerDictionary[currentPartner].length === 0) {
                        playerDictionary[currentPartner] = [...config.players];
                        playerDictionary[currentPartner].splice(playerDictionary[currentPartner].indexOf(currentPlayer), 1);
                        playerDictionary[currentPartner].splice(playerDictionary[currentPartner].indexOf(currentPartner), 1);
                    }

                    break;
                }
            }

            console.log(`Current players for this match: ${currentPlayers}`);

            // const currentPlayers = players.splice(0, 4);
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
        </Box>
    );
}

export default RoundRobin;