import React from "react";
import { IState as Props } from "./Main";
import Bye from "./Bye";
import Match from "./Match";
import { Box, Card, CardContent, Divider, Grid, Typography } from "@material-ui/core";

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
        if (gameData.length === 0) {
            const bracket = generateBracket();

            setGameData([...bracket]);
        }
    }

    let matchKeyList: string[] = [];
    let teamDictionary: { [name: string]: number } = { };
    let playerDictionary: { [name: string]: number } = { };
    let opponentDictionary: { [name: string]: { [name: string]: number } } = { };

    const generateBracket = (): Props["gameData"] => {
        const rounds = config.rounds;
        const bye = config.players.length - (config.courts.length * 4);
        let playersAlreadyOnBye: Props["config"]["players"] = [];
        
        for (const player1 of config.players) {
            // Initialise dictionary for storing available partners.
            playerDictionary[player1] = 0;
            opponentDictionary[player1] = { };

            for (const player2 of config.players) {
                if (player1 === player2) {
                    continue;
                }

                teamDictionary[[player1, player2].sort().toString()] = 0;
                opponentDictionary[player1][player2] = 0;
            }
        }

        for (const team1 of Object.keys(teamDictionary)) {
            for (const team2 of Object.keys(teamDictionary)) {
                if (team1 === team2) {
                    continue;
                }

                const team1List = team1.split(",");
                const team2List = team2.split(",");

                if (!team1List.some(element => team2List.includes(element))) {
                    matchKeyList.push(team1 + ":" + team2);
                }
            }
        }

        console.log(playerDictionary);
        console.log(teamDictionary);

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

            const matches: IMatch[] = generateMatches(config.courts, currentPlayers, currentPlayersOnBye);
            const round: IRound = {
                number: i,
                matches: matches,
                byes: currentPlayersOnBye
            }

            gameData.push(round);
        }

        // for (const log of matchLog) {
        //     console.log(log);
        // }

        // for (const log of teamLog) {
        //     console.log(log);
        // }

        return gameData;
    }

    const shuffleArray = (array: any): any[] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    const debugMode = false;

    const log = (message: any) => {
        if (debugMode) {
            console.log(message);
        }
    }

    let matchLog: string[] = [];
    let teamLog: string[] = [];

    // Function for rendering each match takes in a list of players and generates the bracket
    const generateMatches = (courts: Props["config"]["courts"], players: Props["config"]["players"], playersOnBye: Props["config"]["players"]): IMatch[] => {
        let result: IMatch[] = []
        let currentPlayers: string[] = [];
        let teamKeyList = Object.keys(teamDictionary);

        // Iterate through all possible matches and select it if:
        // 1. Both teams haven't played with each other.  Tolerance increases.
        // 2. Everyone hasn't played with each other.  Tolerance increases.

        for (let i = 0; i < courts.length; i++) {
            let team1: string[] = [];
            let team2: string[] = [];

            const invalidPlayers = [...currentPlayers, ...playersOnBye];

            let counter = 1;
            let matchFound = false;

            while (!matchFound && counter <= 100) {
                let lowestNumberOfGamesPlayed = Math.min(...Object.values(teamDictionary));

                if (counter % 10 == 0) {
                    lowestNumberOfGamesPlayed++;
                }

                for (const matchKey of matchKeyList) {
                    const team1Key = matchKey.split(":")[0];
                    const team2Key = matchKey.split(":")[1];
    
                    team1 = team1Key.split(",");
                    team2 = team2Key.split(",");
                    const allPlayers = team1.concat(team2);
    
                    // Check that none of these players have already been selected for this round.
                    if (allPlayers.some(element => invalidPlayers.includes(element))) {
                        continue;
                    }
    
                    // Check that the players have the least number of games played.
                    if (teamDictionary[team1Key] > lowestNumberOfGamesPlayed || teamDictionary[team2Key] > lowestNumberOfGamesPlayed) {
                        continue;
                    }
        
                    const player1 = team1[0];
                    const player2 = team1[1];
                    const player3 = team2[0];
                    const player4 = team2[1];
        
                    // // Check if they've played against each other before.
                    // if (opponentDictionary[player1][player3] > 0 || opponentDictionary[player1][player4] > 0) {
                    //     continue;
                    // }
        
                    // if (opponentDictionary[player2][player3] > 0 || opponentDictionary[player2][player4] > 0) {
                    //     continue;
                    // }
        
                    // Otherwise add them to the list.
                    currentPlayers = currentPlayers.concat(allPlayers);
    
                    // Update team dictionary.
                    teamDictionary[team1Key]++;
                    teamDictionary[team2Key]++;
    
                    // Update opponent dictionary.
                    opponentDictionary[player1][player3]++;
                    opponentDictionary[player1][player4]++;
    
                    opponentDictionary[player2][player3]++;
                    opponentDictionary[player2][player4]++;
    
                    opponentDictionary[player3][player1]++;
                    opponentDictionary[player3][player2]++;
    
                    opponentDictionary[player4][player1]++;
                    opponentDictionary[player4][player2]++;
    
                    break;
                }

                counter++;
            }

            const match: IMatch = {
                court: courts[i],
                team1: {
                    player1: team1[0],
                    player2: team1[1],
                    score: 0
                },
                team2: { 
                    player3: team2[0],
                    player4: team2[1],
                    score: 0
                }
            }

            result.push(match);
        }

        console.log({...teamDictionary})
        console.log({...opponentDictionary})
        
        return result;

        // Select teams instead of players..
        for (let i = 0; i < courts.length; i++) {
            const numberOfPlayersAlreadySelected = i * 4;
            const numberOfPlayersToSelect = (i + 1) * 4;

            teamKeyList.sort((a, b) => { 
                return teamDictionary[a] - teamDictionary[b];
            });

            let counter = 1;

            while (currentPlayers.length < numberOfPlayersToSelect && counter <= 100) {
                console.log(`Counter: ${counter}`);

                // If we've tried 5 times and couldn't find a team, then remove the first team from the list.
                if (counter % 2 == 0 && currentPlayers.length > 0) {
                    let teamToRemove = currentPlayers.splice(0, 2).sort().toString();
                    console.log(`Removing ${teamToRemove} (${teamDictionary[teamToRemove]--})`);
                }

                // Figure out the minimum number of games any team has played.
                let lowestNumberOfGamesPlayed = Math.min(...Object.values(teamDictionary));

                // After some time, increase the search radius.
                if (counter % 10 == 0) {
                    lowestNumberOfGamesPlayed++;
                }

                console.log(`Lowest number of games: ${lowestNumberOfGamesPlayed}`);
                
                // Iterate through the teams that have played that many games.
                let teamsToSearch: string[] = [];

                for (const [key, value] of Object.entries(teamDictionary)) {
                    if (value === lowestNumberOfGamesPlayed) {
                        teamsToSearch.push(key);
                    }
                }

                teamsToSearch = [...shuffleArray(teamsToSearch)];
                // console.log(`Teams to check: ${teamsToSearch.toString()}`);

                for (let j = 0; j < teamsToSearch.length; j++) {
                    // If the players in this matchup are available, then add them to the current players list.
                    const invalidPlayers = [...currentPlayers, ...playersOnBye];
                    const teamKey = teamsToSearch[j].split(",");

                    if (!teamKey.some(element => invalidPlayers.includes(element))) {
                        console.log(`Adding ${teamKey.toString()} (${teamDictionary[teamsToSearch[j]]}) to the current players.`);
                        currentPlayers = currentPlayers.concat(teamKey);
                        teamDictionary[teamsToSearch[j]]++;
                    }
                }

                counter++;
            }

            log(`Current players for this match: ${currentPlayers}`);

            const finalMatchup = [currentPlayers[numberOfPlayersAlreadySelected + 0], currentPlayers[numberOfPlayersAlreadySelected + 1], currentPlayers[numberOfPlayersAlreadySelected + 2], currentPlayers[numberOfPlayersAlreadySelected + 3]].sort();
            matchLog.push(`${finalMatchup[0]},${finalMatchup[1]}|${finalMatchup[2]},${finalMatchup[3]}`);

            const team1 = [currentPlayers[numberOfPlayersAlreadySelected + 0], currentPlayers[numberOfPlayersAlreadySelected + 1]].sort();
            const team2 = [currentPlayers[numberOfPlayersAlreadySelected + 2], currentPlayers[numberOfPlayersAlreadySelected + 3]].sort();

            teamLog.push(team1.toString());
            teamLog.push(team2.toString());

            // Test round matchups
            // console.log([currentPlayers[numberOfPlayersAlreadySelected + 0], currentPlayers[numberOfPlayersAlreadySelected + 1], currentPlayers[numberOfPlayersAlreadySelected + 2], currentPlayers[numberOfPlayersAlreadySelected + 3]].sort().toString());

            // Test team matchups
            // console.log([currentPlayers[numberOfPlayersAlreadySelected + 0], currentPlayers[numberOfPlayersAlreadySelected + 1]].sort().toString());
            // console.log([currentPlayers[numberOfPlayersAlreadySelected + 2], currentPlayers[numberOfPlayersAlreadySelected + 3]].sort().toString());

            const match: IMatch = {
                court: courts[i],
                team1: {
                    player1: currentPlayers[numberOfPlayersAlreadySelected + 0],
                    player2: currentPlayers[numberOfPlayersAlreadySelected + 1],
                    score: 0
                },
                team2: { 
                    player3: currentPlayers[numberOfPlayersAlreadySelected + 2],
                    player4: currentPlayers[numberOfPlayersAlreadySelected + 3],
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