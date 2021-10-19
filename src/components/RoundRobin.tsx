import React from "react";
import { IState as Props } from "./Main";
import ByeContainer from "./ByeContainer";
import Match from "./Match";
import { Button, Box, Card, CardContent, Divider, Grid, Typography } from "@material-ui/core";
import Progress from "./Progress";
import { generateRound } from "../helpers/Socket";
import { IPlayer } from "../types";

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
        player1: IPlayer,
        player2: IPlayer,
        score: number
    },
    team2: {
        player3: IPlayer,
        player4: IPlayer,
        score: number
    }
}

export interface IRound {
    round: number,
    matches: IMatch[],
    byes: Props["config"]["players"]
}

const RoundRobin: React.FC<IProps> = ({ gameState, sessionId, isHost, isConnected }) => {

    const renderRoundRobin = () => {
        return (
            <>
                {[...gameState].reverse().map((round, roundKey) => {
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

    const handleGenerateRoundClick = () => {
        // TODO: Show spinner
        generateRound(sessionId);
    }

    return (
        <>
            {
                isHost
                ? <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGenerateRoundClick}
                    >
                        Next round
                    </Button>
                </>
                : ""
            }
            {
                gameState.length === 0
                ? <Progress />
                : renderRoundRobin()
            }
        </>
    );
}

export default RoundRobin;