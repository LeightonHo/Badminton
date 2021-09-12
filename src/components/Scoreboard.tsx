import { Box } from "@material-ui/core";
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
    console.log(gameData);

    const generateTableBody = () => {
        let result: IPlayerStats = {}

        for (const player of config.players) {
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
                            <TableCell>{playerStat.name} {displayEmoji(key, config.players.length)}</TableCell>
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

    return (
        <Box>
            <TableContainer>
                <Table>
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
        </Box>
    );
}

export default Scoreboard;