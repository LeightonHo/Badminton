import { Avatar, Card, CardContent, Typography } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { RootState } from "../redux/Store";
import { useSelector } from "react-redux";
import { IPlayer } from "../types";

interface IPlayerStats {
    [id: string]: {
        player: IPlayer,
        win: number,
        loss: number
    }
}

const Scoreboard = () => {
    const playerList: IPlayer[] = [];
    const { rounds } = useSelector((state: RootState) => state.gameState);

    const initPlayers = () => {
        // Get all the unique players in the game data
        for (const round of rounds) {
            for (const match of round.matches) {
                addPlayerToList(match.team1.player1);
                addPlayerToList(match.team1.player2);
                addPlayerToList(match.team2.player3);
                addPlayerToList(match.team2.player4);
            }
        }
    }

    const addPlayerToList = (playerToAdd: IPlayer): void => {
        for (const player of playerList) {
            if (player.userId === playerToAdd.userId) {
                return;
            }
        }

        playerList.push(playerToAdd);
    }

    const generateTableBody = () => {
        let result: IPlayerStats = {}

        initPlayers();

        for (const player of playerList) {
            result[player.userId] = {
                player: player,
                win: 0,
                loss: 0
            };
        }

        for (const round of rounds) {
            for (const match of round.matches) {
                // Check if the match is finished, based on the configured winning score.
                // Adjust player stats.
                if (match.team1.score && match.team2.score) {
                    if (match.team1.score > match.team2.score) {
                        result[match.team1.player1.userId].win++;
                        result[match.team1.player2.userId].win++;
                        result[match.team2.player3.userId].loss++;
                        result[match.team2.player4.userId].loss++;
                    } else {
                        result[match.team1.player1.userId].loss++;
                        result[match.team1.player2.userId].loss++;
                        result[match.team2.player3.userId].win++;
                        result[match.team2.player4.userId].win++;
                    }
                }
            }
        }

        return (
            <TableBody>
                {sortPlayerStats(result).map((playerStat, key) => {
                    return (
                        <TableRow
                            hover
                            key={key}
                        >
                            <TableCell style={{ 
                                display: "flex", 
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                {
                                    playerStat.avatarUrl
                                    ? <Avatar style={{ margin: "0 10px 0 0" }}>
                                        <img src={playerStat.avatarUrl} alt="avatar" height="50px" width="50px" />
                                    </Avatar>
                                    : <Avatar style={{ margin: "0 10px 0 0" }}>{playerStat.alias[0]}</Avatar>
                                }
                                <Typography>
                                    {playerStat.alias} {displayEmoji(key, playerList.length)}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">{playerStat.win}</TableCell>
                            <TableCell align="right">{playerStat.loss}</TableCell>
                            <TableCell align="right">{playerStat.winrate}%</TableCell>
                        </TableRow>
                    );
                })}
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
                userId: value.player.userId,
                alias: value.player.alias,
                avatarUrl: value.player.avatarUrl,
                win: value.win,
                loss: value.loss,
                winrate: calculateWinRate(value.win, value.loss)
            });
        }

        return result.sort((a, b) => {
            if (a.win === b.win) {
                if (a.loss === b.loss) {
                    if (a.alias < b.alias) {
                        return -1;
                    }

                    return a.alias > b.alias ? 1 : 0;
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

    // const generateStatistics = () => {
    //     let playerCourtDictionary: { [name: string]: { [name: string]: number } };
    //     let partnerDictionary: { [name: string]: { [name: string]: number } } = { };
    //     let opponentDictionary: { [name: string]: { [name: string]: number } } = { };
    //     let gamesPlayedDictionary: { [name: string]: number} = { };

    //     console.log(config)

    //     if (config.players.length === 0 ) {
    //         return;
    //     }

    //     // Init dictionaries.
    //     for (const player1 of config.players) {
    //         partnerDictionary[player1.userId] = {}
    //         opponentDictionary[player1.userId] = {}
    //         gamesPlayedDictionary[player1.userId] = 0;

    //         for (const player2 of config.players) {
    //             if (player1.userId === player2.userId) {
    //                 continue;
    //             }

    //             partnerDictionary[player1.userId][player2.userId] = 0;
    //             opponentDictionary[player1.userId][player2.userId] = 0;
    //         }
    //     }

    //     for (const game of processedGameData) {
    //         // Update bye dictionary.

    //         for (const match of game.matches) {
    //             gamesPlayedDictionary[match.team1.player1.userId]++;
    //             gamesPlayedDictionary[match.team1.player2.userId]++;
    //             gamesPlayedDictionary[match.team2.player3.userId]++;
    //             gamesPlayedDictionary[match.team2.player4.userId]++;

    //             // Update partner dictionary.
    //             partnerDictionary[match.team1.player1.userId][match.team1.player2.userId]++;
    //             partnerDictionary[match.team1.player2.userId][match.team1.player1.userId]++;

    //             partnerDictionary[match.team2.player3.userId][match.team2.player4.userId]++;
    //             partnerDictionary[match.team2.player4.userId][match.team2.player3.userId]++;

    //             // Update opponent dictionary.
    //             opponentDictionary[match.team1.player1.userId][match.team2.player3.userId]++;
    //             opponentDictionary[match.team1.player1.userId][match.team2.player4.userId]++;

    //             opponentDictionary[match.team1.player2.userId][match.team2.player3.userId]++;
    //             opponentDictionary[match.team1.player2.userId][match.team2.player4.userId]++;

    //             opponentDictionary[match.team2.player3.userId][match.team1.player1.userId]++;
    //             opponentDictionary[match.team2.player3.userId][match.team1.player2.userId]++;

    //             opponentDictionary[match.team2.player4.userId][match.team1.player1.userId]++;
    //             opponentDictionary[match.team2.player4.userId][match.team1.player2.userId]++;
    //         }
    //     }

    //     let partnerStatisticsMessageList: string[] = [];
    //     let opponentStatisticsMessageList: string[] = [];

    //     for (const player1 of Object.keys(partnerDictionary)) {
    //         let playerList = [...config.players];
    //         let partnerStatisticsMessage = `[Partner Statistics] ${player1}: `;

    //         for (let i = 0; i < playerList.length; i++) {
    //             if (playerList[i].userId === player1) {
    //                 playerList.splice(i, 1);
    //                 break;
    //             }
    //         }

    //         // Generate partner statistics.
    //         playerList.sort((a, b) => {
    //             return partnerDictionary[player1][b.userId] - partnerDictionary[player1][a.userId];
    //         });

    //         for (const player2 of playerList) {
    //             if (player1 === player2.userId) {
    //                 continue;
    //             }

    //             const gamesPlayedWith = partnerDictionary[player1][player2.userId];

    //             partnerStatisticsMessage += `${player2} (${gamesPlayedWith}), `;
    //         }

    //         partnerStatisticsMessageList.push(partnerStatisticsMessage);
    //     }

    //     for (const player1 of Object.keys(partnerDictionary)) {
    //         let playerList = [...config.players];
    //         let opponentStatisticsMessage = `[Opponent Statistics] ${player1}: `;

    //         // Generate opponent statistics.
    //         playerList.sort((a, b) => {
    //             return opponentDictionary[player1][b.userId] - opponentDictionary[player1][a.userId];
    //         });

    //         for (const player2 of playerList) {
    //             if (player1 === player2.userId) {
    //                 continue;
    //             }

    //             const gamesPlayedAgainst = opponentDictionary[player1][player2.userId];

    //             opponentStatisticsMessage += `${player2} (${gamesPlayedAgainst}), `;
    //         }

    //         opponentStatisticsMessageList.push(opponentStatisticsMessage);
    //     }

    //     // Generate games played statistics.
    //     let playerList = [...config.players];

    //     playerList.sort((a, b) => {
    //         return gamesPlayedDictionary[a.userId] - gamesPlayedDictionary[b.userId];
    //     });

    //     for (const player of playerList) {
    //         console.log(`${player} played ${gamesPlayedDictionary[player.userId]} times and was on bye ${processedGameData.length - gamesPlayedDictionary[player.userId]} times.`)
    //     }

    //     for (const message of partnerStatisticsMessageList) {
    //         console.log(message);
    //     }

    //     for (const message of opponentStatisticsMessageList) {
    //         console.log(message);
    //     }

    //     console.log({...partnerDictionary});
    //     console.log({...opponentDictionary});

    //     const messages = partnerStatisticsMessageList.concat(opponentStatisticsMessageList);

    //     // return (
    //     //     messages.map((message, key) => {
    //     //         return (
    //     //             <Box>
    //     //                 <Typography 
    //     //                     key={key}
    //     //                     variant="inherit"
    //     //                 >
    //     //                     {message}
    //     //                 </Typography>
    //     //             </Box>
    //     //         );
    //     //     })
    //     // );
    // }

    const renderScoreboard = () => {
        return (
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
                                    <TableCell>Player</TableCell>
                                    <TableCell align="right">Win</TableCell>
                                    <TableCell align="right">Loss</TableCell>
                                    <TableCell align="right">Win %</TableCell>
                                </TableRow>
                            </TableHead>
                            {generateTableBody()}
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            {renderScoreboard()}

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