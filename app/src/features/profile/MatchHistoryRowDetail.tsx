import { TableRow, TableCell, Box, Table, TableHead, TableBody } from "@material-ui/core";
import { Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import PlayerAvatar from "../../components/PlayerAvatar";
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";

interface Prop {
    sessionArchiveId: string,
    playerCount: number
}

const MatchHistoryRowDetail: React.FC<Prop> = ({ sessionArchiveId, playerCount}) => {
    const { token } = useSelector((state: RootState) => state.general);
    const [sessionArchive, setSessionArchive] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        getSessionArchive(sessionArchiveId);
    }, [sessionArchiveId]);

    const getSessionArchive = (sessionArchiveId: string) => {
        axios.get<any>(`${process.env.REACT_APP_API_URL}/session-archive?sessionArchiveId=${sessionArchiveId}`, {
            headers: {
                "Authorization": token
            }
        }).then(({ data }) => {
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
    
    const handleExport = (): void => {
        let rows = [];
        const rounds = sessionArchive.gameState;

        for (let i = 0; i < rounds.length; i++) {
            let roundNumber = i + 1;
            let round = rounds[i];
            
            for (let j = 0; j < round.matches.length; j++) {
                let match = round.matches[j];

                rows.push([roundNumber, match.team1.player1.userId, match.team1.player1.alias, match.team1.player2.userId, match.team1.player2.alias, match.team1.score, match.team1.score > match.team2.score ? "W" : "L"]);
                rows.push([roundNumber, match.team2.player3.userId, match.team2.player3.alias, match.team2.player4.userId, match.team2.player4.alias, match.team2.score, match.team2.score > match.team1.score ? "W" : "L"]);
            }
        }
        
        const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
        let downloadAnchorElement = document.getElementById("downloadAnchorElement");

        downloadAnchorElement?.setAttribute("href", encodeURI(csvContent));
        downloadAnchorElement?.setAttribute("download", `badminton-export-${new Date().toISOString().split("T")[0]}.csv`);
        downloadAnchorElement?.click();
    }

    const renderScoreboard = () => {
        return (
            <TableRow>
                <TableCell colSpan={5}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}>
                                    <CloudDownloadOutlinedIcon onClick={handleExport} style={{
                                        cursor: "pointer"
                                    }} />
                                    <a id="downloadAnchorElement"></a>
                                </TableCell>
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