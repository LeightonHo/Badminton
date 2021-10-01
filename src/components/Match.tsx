import { Box, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import Player from "./Player";
import { IMatch, IProps as Props } from "./RoundRobin";

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
    
    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (isNaN(parseInt(e.target.value))) {
            return;
        }

        // Update the game data state
        if (e.target.name === "team1Score") { 
            gameState[roundKey].matches[matchKey] = {
                ...match,
                team1: {
                    ...match.team1,
                    score: parseInt(e.target.value)
                }
            }
        } else {
            gameState[roundKey].matches[matchKey] = {
                ...match,
                team2: {
                    ...match.team2,
                    score: parseInt(e.target.value)
                }
            }
        }        
    }

    const pushGameState = () => {
        const payload: any = {
            action: "session",
            method: "pushGameState",
            sessionId: sessionId,
            gameState: JSON.stringify(gameState)
        }

        socket.send(JSON.stringify(payload));
    }

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
                    gameData={gameState} 
                    setGameData={setGameState}
                    roundKey={roundKey} 
                    matchKey={matchKey} 
                />
                <Player 
                    player="player2" 
                    gameData={gameState} 
                    setGameData={setGameState}
                    roundKey={roundKey} 
                    matchKey={matchKey} 
                />
                <Grid item xs className="score-input-grid-item">
                    <TextField
                        variant="outlined"
                        type="number"
                        onChange={handleScoreChange}
                        onBlur={pushGameState}
                        name="team1Score"
                        placeholder={match.team1.score.toString()}
                        size="small"
                        className="score-input"
                    />
                </Grid>
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
                    gameData={gameState} 
                    setGameData={setGameState}
                    roundKey={roundKey} 
                    matchKey={matchKey} 
                />
                <Player 
                    player="player4" 
                    gameData={gameState} 
                    setGameData={setGameState}
                    roundKey={roundKey} 
                    matchKey={matchKey} 
                />
                <Grid item xs className="score-input-grid-item">
                    <TextField
                        variant="outlined"
                        type="number"
                        onChange={handleScoreChange}
                        onBlur={pushGameState}
                        name="team2Score"
                        placeholder={match.team2.score.toString()}
                        size="small"
                        className="score-input"
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Match;