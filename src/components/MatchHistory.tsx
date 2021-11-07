import { Box, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import MatchHistoryRow from "./MatchHistoryRow";

interface Props {
    matchHistory: any[]
}

const useStyles = makeStyles({
    mobileTable: {
        "& .MuiTableCell-root": {
            padding: "4px",
        }
    }
});

const MatchHistory:React.FC<Props> = ({ matchHistory }) => {
    const { isMobile } = useSelector((state: RootState) => state.general);
    const classes = useStyles();

    return (
        <TableContainer style={{
            width: "100%",
            minHeight: isMobile ? 350 : 500
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
                        <TableCell />
                        <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
                        <TableCell style={{ 
                            fontWeight: "bold", textAlign: "center" 
                        }}>
                            <Box>Rounds</Box>
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>W - L</TableCell>
                        <TableCell />
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
    );
}

export default MatchHistory;