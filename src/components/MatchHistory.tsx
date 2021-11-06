import { Box, Card, CardContent, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import MatchHistoryRow from "./MatchHistoryRow";

interface Props {
    matchHistory: any[]
}

const useStyles = makeStyles({
    mobileTable: {
        "& .MuiTableCell-root": {
            padding: "8px",
        }
    }
});

const MatchHistory:React.FC<Props> = ({ matchHistory }) => {
    const { isMobile } = useSelector((state: RootState) => state.general);
    const classes = useStyles();

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
                    width: "100%",
                    maxHeight: isMobile ? 350 : 500
                }}>
                    <Table 
                        stickyHeader
                        classes={{
                            root: isMobile ? classes.mobileTable : ""
                        }}
                    >
                        <TableHead>
                            <TableRow style={{
                                paddingTop: 15
                            }}>
                                <TableCell style={{ maxWidth: "5px" }} />
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
                            overflowY: "auto"
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