import { TableRow, TableCell, Box, Table, TableHead, TableBody, Avatar } from "@material-ui/core";
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
        });
    };

    const renderScoreboard = () => {
        return (
            <TableRow>
                <TableCell colSpan={3}>
                    <Table padding="none">
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
                                                ? <Avatar style={{ height: 20, width: 20, margin: "0 5px 0 0" }}>
                                                    <img src={data.avatarUrl} alt="avatar" height="20px" width="20px" />
                                                </Avatar>
                                                : <Avatar style={{ height: 20, width: 20, margin: "0 5px 0 0" }} />
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

    return (
        <>
            {
                isLoading
                ? "loading..."
                : renderScoreboard()
            }
        </>
    );
}

export default MatchHistoryRowDetail;