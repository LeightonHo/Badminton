import { TableRow, TableCell, Box, Table, TableHead, TableBody } from "@material-ui/core";
import { Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import PlayerAvatar from "./PlayerAvatar";

interface Prop {
    sessionArchiveId: string,
    playerCount: number
}

const MatchHistoryRowDetail: React.FC<Prop> = ({ sessionArchiveId, playerCount}) => {
    const [sessionArchive, setSessionArchive] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        getSessionArchive(sessionArchiveId);
    }, [sessionArchiveId]);

    const getSessionArchive = (sessionArchiveId: string) => {
        axios.get<any>(`${process.env.REACT_APP_API_URL}/session-archive?sessionArchiveId=${sessionArchiveId}`).then(({ data }) => {
            setSessionArchive(JSON.parse(data.payload));
            setIsLoading(false);
        }).catch((error) => {
            console.error(error);
            setIsLoading(false);
        });
    };

    const displayPosition = (key: number): string => {
        if (key === 0) {
            return "🥇";
        } else if (key === 1) {
            return "🥈";
        } else if (key === 2) {
            return "🥉";
        }

        return `${key + 1}.`;
    }

    const renderScoreboard = () => {
        return (
            <TableRow>
                <TableCell colSpan={5}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell style={{ fontWeight: "bold" }}>Player</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bold" }}>W - L</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bold" }}>Win %</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sessionArchive.scoreboard?.map((data: any, key: number) => {
                                return (
                                    <TableRow 
                                        key={key}
                                        hover
                                    >
                                        <TableCell align="center">{displayPosition(key)}</TableCell>
                                        <TableCell style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }}>
                                            <PlayerAvatar 
                                                id={data.userId}
                                                src={data.avatarUrl} 
                                                name={data.alias}
                                                style={{ 
                                                    height: 25, 
                                                    width: 25, 
                                                    margin: "0 5px 0 0",
                                                    fontSize: "14px"
                                                }}
                                            />
                                            <Box>{data.alias}</Box>
                                        </TableCell>
                                        <TableCell align="right">{data.win} - {data.loss}</TableCell>
                                        <TableCell align="right">{data.winrate}%</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableCell>
            </TableRow>
        );
    }

    const showProgress = () => {
        return (
            <TableRow>
                <TableCell colSpan={5}>
                    {/* <LinearProgress /> */}
                    <Skeleton 
                        variant="text"
                        width="100%"
                        height={40}
                        animation="wave"
                    />
                    <Skeleton 
                        variant="rectangular"
                        width="100%"
                        height={playerCount * 40}
                        animation="wave"
                    />
                </TableCell>
            </TableRow>
        );
    }

    return (
        <>
            {
                isLoading
                ? showProgress()
                : renderScoreboard()
            }
        </>
    );
}

export default MatchHistoryRowDetail;