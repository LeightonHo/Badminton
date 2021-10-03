import { Box, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent, useEffect } from "react";
import Player from "./Player";
import { IMatch, IProps as Props } from "./RoundRobin";
import { pushGameState, pushMatchScore } from "../functions/SocketHelper";

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

    useEffect(() => {
        setInput({
            team1Score: match.team1.score,
            team2Score: match.team2.score
        });
    }, [match]);

    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (isNaN(parseInt(e.target.value))) {
            return;
        }

        if (e.target.name === "team1Score") {
            setInput({
                ...input,
                team1Score: parseInt(e.target.value)
            });

            // pushMatchScore(socket, sessionId, roundKey, matchKey, parseInt(e.target.value), null);
        } else {
            setInput({
                ...input,
                team2Score: parseInt(e.target.value)
            });

            // pushMatchScore(socket, sessionId, roundKey, matchKey, null, parseInt(e.target.value));
        }

        // if (e.target.name === "team1Score") {
        //     setInput({
        //         ...input,
        //         team1Score: parseInt(e.target.value)
        //     });
        //     gameState[roundKey].matches[matchKey] = {
        //         ...match,
        //         team1: {
        //             ...match.team1,
        //             score: parseInt(e.target.value)
        //         }
        //     }
        // } else {
        //     setInput({
        //         ...input,
        //         team2Score: parseInt(e.target.value)
        //     });
        //     gameState[roundKey].matches[matchKey] = {
        //         ...match,
        //         team2: {
        //             ...match.team2,
        //             score: parseInt(e.target.value)
        //         }
        //     }
        // }

        // INPUT APPROACH
        // // Update the game data state
        // if (e.target.name === "team1Score") { 
        //     setInput({
        //         ...input,
        //         team1Score: parseInt(e.target.value)
        //     });
        // } else {
        //     setInput({
        //         ...input,
        //         team2Score: parseInt(e.target.value)
        //     });
        // }   
    }

    const handleGameStateUpdate = () => {
        console.log(input);
        console.log("Updating game state..", gameState[roundKey].matches[matchKey].team1.score, gameState[roundKey].matches[matchKey].team2.score);
        pushGameState(socket, sessionId, gameState);
    }

    const pushScoreChange = (team: number) => {
        if (team === 1) {
            pushMatchScore(socket, sessionId, roundKey, matchKey, input.team1Score, null);
        } else {
            pushMatchScore(socket, sessionId, roundKey, matchKey, null, input.team2Score);
        }
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
                        onBlur={() => pushScoreChange(1)}
                        name="team1Score"
                        value={input.team1Score === 0 ? "" : input.team1Score.toString()}
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
                        onBlur={() => pushScoreChange(2)}
                        name="team2Score"
                        value={input.team2Score === 0 ? "" : input.team2Score.toString()}
                        size="small"
                        className="score-input"
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Match;