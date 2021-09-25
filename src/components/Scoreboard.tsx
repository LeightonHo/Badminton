import { Box, Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { IState as Props } from "./Main";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

interface IPlayerStats {
    [id: string]: {
        win: number,
        loss: number
    }
}

interface IProps {
    config: Props["config"],
    gameData: Props["gameData"]
}

const Scoreboard:React.FC<IProps> = ({ config, gameData }) => {

    const players: string[] = []

    const initPlayers = () => {
        // Get all the unique players in the game data
        for (const round of gameData) {
            for (const match of round.matches) {
                if (players.indexOf(match.team1.player1) < 0) {
                    players.push(match.team1.player1);
                }

                if (players.indexOf(match.team1.player2) < 0) {
                    players.push(match.team1.player2);
                }

                if (players.indexOf(match.team2.player3) < 0) {
                    players.push(match.team2.player3);
                }

                if (players.indexOf(match.team2.player4) < 0) {
                    players.push(match.team2.player4);
                }
            }
        }
    }
    
    const generateTableBody = () => {
        let result: IPlayerStats = {}

        initPlayers();

        for (const player of players) {
            result[player] = {
                win: 0,
                loss: 0
            };
        }

        for (const round of gameData) {
            for (const match of round.matches) {
                // Check if the match is finished, based on the configured winning score.
                if (match.team1.score >= config.winningScore || match.team2.score >= config.winningScore) {
                    // Adjust player stats.
                    if (match.team1.score > match.team2.score) {
                        result[match.team1.player1].win++;
                        result[match.team1.player2].win++;
                        result[match.team2.player3].loss++;
                        result[match.team2.player4].loss++;
                    } else {
                        result[match.team1.player1].loss++;
                        result[match.team1.player2].loss++;
                        result[match.team2.player3].win++;
                        result[match.team2.player4].win++;
                    }
                }
            }
        }

        const sortedResults = sortPlayerStats(result);

        return (
            <TableBody>
                { sortedResults.map((playerStat, key) => {
                    return (
                        <TableRow
                            hover
                            key={key}
                        >
                            <TableCell>{playerStat.name} {displayEmoji(key, players.length)}</TableCell>
                            <TableCell align="right">{playerStat.win}</TableCell>
                            <TableCell align="right">{playerStat.loss}</TableCell>
                            <TableCell align="right">{calculateWinRate(playerStat.win, playerStat.loss)}%</TableCell>
                        </TableRow>
                    );
                }) }
            </TableBody>
        );
    }

    const displayEmoji = (key: number, players: number): string => {
        if (key === 0) {
            return "🥇";
        }

        if (key === 1) {
            return "🥈";
        }

        if (key === 2) {
            return "🥉";
        }

        if (key === players - 1) {
            return "🍀";
        }

        return "";
    }

    const sortPlayerStats = (playerStats: IPlayerStats) => {
        let result = [];

        for (const [key, value] of Object.entries(playerStats)) {
            result.push({
                name: key,
                win: value.win,
                loss: value.loss
            });
        }

        return result.sort((a, b) => {
            if (a.win === b.win) {
                if (a.loss === b.loss) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    
                    return a.name > b.name ? 1 : 0;
                }

                return a.loss - b.loss;
            }

            return b.win - a.win;
        });
    }

    const calculateWinRate = (win: number, loss: number): number => {
        if (win + loss === 0) {
            return 0;
        }

        return Math.round(win / (win + loss) * 100);
    }
    
    const generateStatistics = () => {
        let playerCourtDictionary: { [name: string]: { [name: string]: number } };
        let partnerDictionary: { [name: string]: { [name: string]: number } } = { };
        let opponentDictionary: { [name: string]: { [name: string]: number } } = { };
        let gamesPlayedDictionary: { [name: string]: number} = { };
        
        // Init dictionaries.
        for (const player1 of config.players) {
            partnerDictionary[player1] = { }
            opponentDictionary[player1] = { }
            gamesPlayedDictionary[player1] = 0;

            for (const player2 of config.players) {
                if (player1 === player2) {
                    continue;
                }

                partnerDictionary[player1][player2] = 0;
                opponentDictionary[player1][player2] = 0;
            }
        }

        for (const game of gameData) {
            // Update bye dictionary.

            for (const match of game.matches) {
                gamesPlayedDictionary[match.team1.player1]++;
                gamesPlayedDictionary[match.team1.player2]++;
                gamesPlayedDictionary[match.team2.player3]++;
                gamesPlayedDictionary[match.team2.player4]++;

                // Update partner dictionary.
                partnerDictionary[match.team1.player1][match.team1.player2]++;
                partnerDictionary[match.team1.player2][match.team1.player1]++;

                partnerDictionary[match.team2.player3][match.team2.player4]++;
                partnerDictionary[match.team2.player4][match.team2.player3]++;

                // Update opponent dictionary.
                opponentDictionary[match.team1.player1][match.team2.player3]++;
                opponentDictionary[match.team1.player1][match.team2.player4]++;

                opponentDictionary[match.team1.player2][match.team2.player3]++;
                opponentDictionary[match.team1.player2][match.team2.player4]++;

                opponentDictionary[match.team2.player3][match.team1.player1]++;
                opponentDictionary[match.team2.player3][match.team1.player2]++;

                opponentDictionary[match.team2.player4][match.team1.player1]++;
                opponentDictionary[match.team2.player4][match.team1.player2]++;
            }
        }

        let partnerStatisticsMessageList: string[] = [];
        let opponentStatisticsMessageList: string[] = [];

        for (const player1 of Object.keys(partnerDictionary)) {
            let playerList = [...config.players];
            let partnerStatisticsMessage = `[Partner Statistics] ${player1}: `;

            playerList.splice(playerList.indexOf(player1), 1);

            // Generate partner statistics.
            playerList.sort((a, b) => {
                return partnerDictionary[player1][b] - partnerDictionary[player1][a];
            });

            for (const player2 of playerList) {
                if (player1 === player2) {
                    continue;
                }

                const gamesPlayedWith = partnerDictionary[player1][player2];

                partnerStatisticsMessage += `${player2} (${gamesPlayedWith}), `;
            }
            
            partnerStatisticsMessageList.push(partnerStatisticsMessage);
        }

        for (const player1 of Object.keys(partnerDictionary)) {
            let playerList = [...config.players];
            let opponentStatisticsMessage = `[Opponent Statistics] ${player1}: `;

            // Generate opponent statistics.
            playerList.sort((a, b) => {
                return opponentDictionary[player1][b] - opponentDictionary[player1][a];
            });

            for (const player2 of playerList) {
                if (player1 === player2) {
                    continue;
                }

                const gamesPlayedAgainst = opponentDictionary[player1][player2];

                opponentStatisticsMessage += `${player2} (${gamesPlayedAgainst}), `;
            }

            opponentStatisticsMessageList.push(opponentStatisticsMessage);
        }

        // Generate games played statistics.
        let playerList = [...config.players];

        playerList.sort((a, b) => {
            return gamesPlayedDictionary[a] - gamesPlayedDictionary[b];
        });

        for (const player of playerList) {
            console.log(`${player} played ${gamesPlayedDictionary[player]} times and was on bye ${gameData.length - gamesPlayedDictionary[player]} times.`)
        }

        for (const message of partnerStatisticsMessageList) {
            console.log(message);
        }

        for (const message of opponentStatisticsMessageList) {
            console.log(message);
        }

        // console.log({...partnerDictionary});
        // console.log({...opponentDictionary});

        const messages = partnerStatisticsMessageList.concat(opponentStatisticsMessageList);

        // return (
        //     messages.map((message, key) => {
        //         return (
        //             <Box>
        //                 <Typography 
        //                     key={key}
        //                     variant="inherit"
        //                 >
        //                     {message}
        //                 </Typography>
        //             </Box>
        //         );
        //     })
        // );
    }

    return (
        <>
            <Card className="card">
                <CardContent>
                    <Typography 
                        variant="h5"
                        gutterBottom
                    >
                        Scoreboard
                    </Typography>
                    <TableContainer>
                        <Table padding="none" className="scoreboard-table">
                            <TableHead className="scoreboard-header">
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Win</TableCell>
                                    <TableCell align="right">Loss</TableCell>
                                    <TableCell align="right">Win Rate</TableCell>
                                </TableRow>
                            </TableHead>
                            {generateTableBody()}
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* {generateStatistics()} */}

            {/* <Card className="card">
                <CardContent>
                    <Typography 
                        variant="h5"
                        gutterBottom
                    >
                        Statistics
                    </Typography>
                    <Box className="statistics-box">
                        {generateStatistics()}
                    </Box>
                </CardContent>
            </Card> */}
        </>
    );
}

export default Scoreboard;