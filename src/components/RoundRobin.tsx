import ByeContainer from "./ByeContainer";
import Match from "./Match";
import { Box, Card, CardContent, Checkbox, Divider, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { IMatch, IRound } from "../types";
import { setFilterView } from "../redux/General";
import { useEffect } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const RoundRobin = () => {
    const dispatch = useDispatch();
    const { userId, filterView } = useSelector((state: RootState) => state.general);
    const { rounds } = useSelector((state: RootState) => state.gameState);

    useEffect(() => {

    }, [filterView]);

    const shouldShowMatch = (match: IMatch): boolean => {
        return [match.team1.player1.userId, match.team1.player2.userId, match.team2.player3.userId, match.team2.player4.userId].indexOf(userId) > 0;
    }

    const handleFilterViewChange = (event: React.MouseEvent<HTMLElement>, newFilterView: string) => {
        dispatch(setFilterView(newFilterView));
    }

    const renderRoundRobin = () => {
        return (
            <>
                <Box style={{
                    marginTop: "10px",
                    marginRight: "10px",
                    display: "flex",
                    flexDirection: "row-reverse"
                }}>
                    <ToggleButtonGroup
                        color="primary"
                        value={filterView}
                        exclusive
                        onChange={handleFilterViewChange}
                        style={{
                            height: "30px"
                        }}
                    >
                        <ToggleButton value="detailed">Detailed</ToggleButton>
                        <ToggleButton value="compact">Compact</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                {[...rounds].reverse().map((round, roundKey) => {
                    return (
                        <Card 
                            key={roundKey}
                            className="card round-card"
                        >
                            <CardContent>
                                <Grid 
                                    container
                                    direction="column"
                                    className="divRound"
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Typography 
                                            variant="h6"
                                            gutterBottom
                                            style={{
                                                textAlign: "center",
                                                fontSize: "16px",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            ROUND {round.round}
                                        </Typography>
                                    </Grid>

                                    <Divider />

                                    {round.matches.map((match, matchKey) => {
                                        return (
                                            <Box 
                                                key={matchKey} 
                                                style={{
                                                    marginTop: "5px",
                                                    display: filterView === "detailed" || shouldShowMatch(match) ? "" : "none"
                                                }}
                                            >
                                                <Grid 
                                                    item xs
                                                    style={{
                                                        paddingTop: "5px",
                                                        paddingBottom: "5px",
                                                        marginBottom: "10px"
                                                    }}
                                                >
                                                    <Match 
                                                        match={match} 
                                                        roundKey={round.round - 1} 
                                                        matchKey={matchKey} 
                                                    />
                                                </Grid>
                                                {addMatchDivider(matchKey, round.matches.length)}
                                            </Box>
                                        );
                                    })}
                                    
                                    {round.byes.length > 0 ? <Divider /> : ""}

                                    <Grid item xs>
                                        <ByeContainer 
                                            players={round.byes} 
                                            roundKey={roundKey} 
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    );
                })}
            </>
        );
    }

    const addMatchDivider = (matchKey: number, totalMatches: number) => {
        if (matchKey !== totalMatches - 1) {
            return (
              <Divider />
            );
        }
    }

    return (
        <>
            {renderRoundRobin()}
        </>
    );
}

export default RoundRobin;