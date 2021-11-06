import { TableRow, TableCell, Box, Table, TableHead, TableBody, Avatar, LinearProgress } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

interface Prop {
    sessionArchiveId: string
}

const MatchHistoryRowDetail: React.FC<Prop> = ({ sessionArchiveId }) => {
    const [sessionArchive, setSessionArchive] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        getSessionArchive(sessionArchiveId);
    }, []);

    const getSessionArchive = (sessionArchiveId: string) => {
        axios.get<any>(`${process.env.REACT_APP_API_URL}/session-archive?sessionArchiveId=${sessionArchiveId}`).then(({ data }) => {
            setSessionArchive(JSON.parse(data.payload));
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        });
    };

    const renderScoreboard = () => {
        return (
            <TableRow>
                <TableCell colSpan={4}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell style={{ fontWeight: "bold" }}>Player</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bold" }}>W - L</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bold" }}>Win Rate</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sessionArchive.scoreboard?.map((data: any, key: number) => {
                                return (
                                    <TableRow key={key}>
                                        <TableCell>{key + 1}.</TableCell>
                                        <TableCell style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }}>
                                            {
                                                data.avatarUrl
                                                ? <Avatar style={{ height: 25, width: 25, margin: "0 5px 0 0" }}>
                                                    <img src={data.avatarUrl} alt="avatar" height="25px" width="25px" />
                                                </Avatar>
                                                : <Avatar style={{ fontSize: "14px", height: 25, width: 25, margin: "0 5px 0 0" }}>{data.alias[0]}</Avatar>
                                            }
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
                <TableCell colSpan={4}>
                    <LinearProgress />
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