import ByeContainer from "./ByeContainer";
import Match from "./Match";
import { Box, Card, CardContent, Checkbox, Divider, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { useState } from "react";
import { IRound } from "../types";

const RoundRobin = () => {
    const [compactView, setCompactView] = useState<boolean>(false);
    const { userId } = useSelector((state: RootState) => state.general);
    const { rounds } = useSelector((state: RootState) => state.gameState);

    const getFilteredRounds = () => {
        let result: IRound[] = JSON.parse(JSON.stringify(rounds));

        if (compactView) {
            for (let round of result) {
                round.matches = [];
            }

            for (let i = 0; i < rounds.length; i++) {
                let round = rounds[i];

                for (let j = 0; j < round.matches.length; j++) {
                    let match = round.matches[j];

                    if ([match.team1.player1.userId, match.team1.player2.userId, match.team2.player3.userId, match.team2.player4.userId].indexOf(userId) > 0) {
                        result[i].matches.push(match);
                    }
                }
            }
        }

        return result.reverse();
    }

    const renderRoundRobin = () => {
        return (
            <>
                <Card className="card round-card">
                    <CardContent style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Box>Compact view </Box>
                        <Checkbox 
                            color="primary" 
                            onClick={() => { setCompactView(!compactView); }}
                        />
                    </CardContent>
                </Card>
                {getFilteredRounds().map((round, roundKey) => {
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
                                            <Box key={matchKey} className="match-box">
                                                <Grid 
                                                    item xs
                                                    style={{
                                                        paddingBottom: "15px",
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