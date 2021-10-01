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

    const [input, setInput] = useState({
        team1Score: match.team1.score,
        team2Score: match.team2.score
    });
    
    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (isNaN(parseInt(e.target.value))) {
            return;
        }

        // Update the game data state
        if (e.target.name === "team1Score") { 
            setInput({
                ...input,
                team1Score: parseInt(e.target.value)
            });
        } else {
            setInput({
                ...input,
                team2Score: parseInt(e.target.value)
            });
        }   
    }

    const pushGameState = () => {
        gameState[roundKey].matches[matchKey] = {
            ...match,
            team1: {
                ...match.team1,
                score: input.team1Score
            },
            team2: {
                ...match.team2,
                score: input.team2Score
            }
        };

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
                <Grid item xs className="score-input-grid-item">
                    <TextField
                        variant="outlined"
                        type="number"
                        onChange={handleScoreChange}
                        onBlur={pushGameState}
                        name="team1Score"
                        value={input.team1Score.toString()}
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
                <Grid item xs className="score-input-grid-item">
                    <TextField
                        variant="outlined"
                        type="number"
                        onChange={handleScoreChange}
                        onBlur={pushGameState}
                        name="team2Score"
                        value={input.team2Score.toString()}
                        size="small"
                        className="score-input"
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Match;