import { Box, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import MatchHistoryRow from "./MatchHistoryRow";

interface Props {
    matchHistory: any[]
}

const MatchHistory:React.FC<Props> = ({ matchHistory }) => {
    const { isMobile } = useSelector((state: RootState) => state.general);
    
    return (
        <Card 
            className="card"
        >
            <CardContent>
                <Typography
                    variant="h5"
                    gutterBottom
                    className="config-card-header"
                >
                    History
                </Typography>

                <TableContainer style={{
                    maxHeight: 400
                }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow style={{
                                paddingTop: 15
                            }}>
                                <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
                                <TableCell style={{ 
                                    fontWeight: "bold", textAlign: "center" 
                                }}>
                                    <Box>
                                        Rounds
                                    </Box>
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>W - L</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{
                            maxHeight: 200,
                            overflow: "auto"
                        }}>
                            {
                                [...matchHistory].reverse().map((matchHistoryItem, key) => {
                                    return (
                                        <MatchHistoryRow 
                                            key={key}
                                            index={key}
                                            data={matchHistoryItem}
                                        />
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}

export default MatchHistory;