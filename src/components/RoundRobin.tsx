import React, { useEffect, useState } from "react";
import ByeContainer from "./ByeContainer";
import Match from "./Match";
import { Box, Card, CardContent, Divider, Grid, Typography } from "@material-ui/core";
import Progress from "./Progress";
import { IPlayer, IRound, IMatch } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export interface IProps {
    sessionId: string,
    isHost: boolean,
    isConnected: boolean
}

const RoundRobin: React.FC<IProps> = ({ sessionId, isHost, isConnected }) => {

    const { rounds } = useSelector((state: RootState) => state.gameState);
    const [loading, setLoading] = useState(false);

    const renderRoundRobin = () => {
        return (
            <>
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
                                            className="spnGameLabel"
                                            gutterBottom
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
                                                    className="match"
                                                >
                                                    <Match 
                                                        match={match} 
                                                        roundKey={round.round - 1} 
                                                        matchKey={matchKey} 
                                                        sessionId={sessionId} 
                                                        isHost={isHost}
                                                        isConnected={isConnected}
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
                                            sessionId={sessionId} 
                                            isHost={isHost}
                                            isConnected={isConnected}
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
            {
                loading
                ? <Progress />
                : ""
            }
            {
                rounds.length === 0
                ? <Progress />
                : renderRoundRobin()
            }
        </>
    );
}

export default RoundRobin;