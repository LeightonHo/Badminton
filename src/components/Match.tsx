import { Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Player from "./Player";
import { IMatch, IProps as Props } from "./RoundRobin";
import Score from "./Score";

interface IProps {
    match: IMatch,
    gameState: Props["gameState"],
    setGameState: React.Dispatch<React.SetStateAction<Props["gameState"]>>,
    roundKey: number,
    matchKey: number,
    socket: WebSocket,
    sessionId: string
}

const Match: React.FC<IProps> = ({ match, gameState, setGameState, roundKey, matchKey, socket, sessionId }) => {

    return (
        <Grid
            container
            direction="row"
            spacing={1}
        >
            <Grid
                item xs={1}
                className="vertical-align-center"
            >
                <Typography
                    variant="h6"
                    className="court-number"
                >
                    {match.court}
                </Typography>
            </Grid>
            <Grid 
                container
                item xs
                direction="column"
                justifyContent="center"
            >
                <Player 
                    player="player1" 
                    gameState={gameState} 
                    setGameState={setGameState}
                    roundKey={roundKey} 
                    matchKey={matchKey}
                    socket={socket}
                    sessionId={sessionId}
                />
                <Player 
                    player="player2" 
                    gameState={gameState} 
                    setGameState={setGameState}
                    roundKey={roundKey}
                    matchKey={matchKey}
                    socket={socket}
                    sessionId={sessionId}
                />
                <Score team={1} score={match.team1.score} roundKey={roundKey} matchKey={matchKey} socket={socket} sessionId={sessionId} />
            </Grid>
            <Grid
                item xs={1}
                className="vertical-align-center"
            >
                <Typography variant="overline">vs</Typography>
            </Grid>
            <Grid 
                container
                item xs
                direction="column"
            >
                <Player 
                    player="player3" 
                    gameState={gameState} 
                    setGameState={setGameState}
                    roundKey={roundKey} 
                    matchKey={matchKey}
                    socket={socket}
                    sessionId={sessionId}
                />
                <Player 
                    player="player4" 
                    gameState={gameState} 
                    setGameState={setGameState}
                    roundKey={roundKey} 
                    matchKey={matchKey}
                    socket={socket}
                    sessionId={sessionId}
                />
                <Score team={2} score={match.team2.score} roundKey={roundKey} matchKey={matchKey} socket={socket} sessionId={sessionId} />
                {/* <Grid item xs className="score-input-grid-item">
                    <TextField
                        variant="outlined"
                        type="number"
                        onChange={handleScoreChange}
                        onBlur={() => pushScoreChange(2)}
                        name="team2Score"
                        value={input.team2Score === 0 ? "" : input.team2Score.toString()}
                        size="small"
                        className="score-input"
                    />
                </Grid> */}
            </Grid>
        </Grid>
    );
}

export default Match;