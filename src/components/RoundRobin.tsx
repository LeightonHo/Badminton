import React from "react";
import { IState as Props } from "./Main";
import ByeContainer from "./ByeContainer";
import Match from "./Match";
import { Backdrop, Box, Card, CardContent, Divider, Grid, LinearProgress, Typography } from "@material-ui/core";

export interface IProps {
    config: Props["config"],
    gameState: Props["gameState"],
    sessionId: string,
    isHost: boolean,
    isConnected: boolean
}

export interface IMatch {
    court: string,
    team1: {
        player1: string,
        player2: string,
        score: number
    },
    team2: {
        player3: string,
        player4: string,
        score: number
    }
}

export interface IRound {
    number: number,
    matches: IMatch[],
    byes: Props["config"]["players"]
}

const RoundRobin: React.FC<IProps> = ({ gameState, sessionId, isHost, isConnected }) => {

    const renderRoundRobin = () => {
        return (
            <>
                {gameState.map((round, roundKey) => {
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
                                            ROUND {round.number}
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
                                                        roundKey={roundKey} 
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

    const showSpinner = () => {
        return (
            <>
                <Backdrop
                    style={{ color: '#fff', zIndex: 99 }}
                    open={true}
                />
                <LinearProgress 
                    color="primary"
                />
            </>
        );
    }

    return (
        <>
            {gameState.length === 0
            ? showSpinner()
            : renderRoundRobin()
            }
        </>
    );
}

export default RoundRobin;