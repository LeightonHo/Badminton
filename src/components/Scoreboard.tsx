import { Box } from "@material-ui/core";
import React, { FC } from "react";
import { IState as Props } from "./Main";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

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
        // let result: IPlayerStats[] = [];
        let result: IPlayerStats = {}

        for (const player of config.players) {
            result[player.name] = {
                win: 0,
                loss: 0
            };
        }

        for (const round of gameData) {
            for (const match of round.matches) {
                // check if match is finished
                if (match.team1.score >= config.winningScore || match.team2.score >= config.winningScore) {
                    // figure out who the winners & losers are
                    if (match.team1.score > match.team2.score) {
                        // team 1 win
                        result[match.team1.player1].win++;
                        result[match.team1.player2].win++;
                        result[match.team2.player3].loss++;
                        result[match.team2.player4].loss++;
                    } else {
                        // team 2 win
                        result[match.team1.player1].loss++;
                        result[match.team1.player2].loss++;
                        result[match.team2.player3].win++;
                        result[match.team2.player4].win++;
                    }
                }
            }
        }

        const sortedResults = sortPlayerStats(result);

        console.log(sortedResults);

        return (
            <TableBody>
                { sortedResults.map((playerStat, key) => {
                    return (
                        <TableRow
                            hover
                            key={key}
                        >
                            <TableCell>{playerStat.name}</TableCell>
                            <TableCell align="right">{playerStat.win}</TableCell>
                            <TableCell align="right">{playerStat.loss}</TableCell>
                            <TableCell align="right">{calculateWinRate(playerStat.win, playerStat.loss)}%</TableCell>
                        </TableRow>
                    );
                }) }
            </TableBody>
        );
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

        return win / (win + loss) * 100;
    }

    return (
        <Box>
            <TableContainer>
                <Table>
                    <TableHead>
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