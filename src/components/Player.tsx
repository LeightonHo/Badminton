import { Box, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import { IProps as Props } from "./RoundRobin";
import { pushGameState } from "../functions/SocketHelper";

interface IProps {
    player: string,
    gameState: Props["gameState"],
    setGameState: React.Dispatch<React.SetStateAction<Props["gameState"]>>,
    roundKey: number,
    matchKey: number,
    socket: WebSocket,
    sessionId: string
}

const Player: React.FC<IProps> = ({ player, gameState, setGameState, roundKey, matchKey, socket, sessionId }) => {

    let playerName = "";
    const match = gameState[roundKey].matches[matchKey];
    const [input, setInput] = useState({
        value: "",
        editing: false,
        edited: false
    });

    switch (player) {
        case "player1":
            playerName = match.team1.player1;
            break;
        case "player2":
            playerName = match.team1.player2;
            break;
        case "player3":
            playerName = match.team2.player3;
            break;
        case "player4":
            playerName = match.team2.player4;
            break;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            return;
        }

        setInput({
            ...input,
            value: e.target.value.trim() + "*"
        });
    }

    const handleOnBlur = () => {
        setInput({
            ...input,
            editing: false
        });
    }

    const handleKeyPress = (e: KeyboardEvent): void => {
        if (e.key === "Enter" || e.key === "Escape") {
            if (input.value === "") {
                setInput({
                    ...input,
                    editing: false
                });
    
                return;
            }

            if (player === "player1" || player === "player2") { 
                gameState[roundKey].matches[matchKey] = {
                    ...match,
                    team1: {
                        ...match.team1,
                        [player]: input.value
                    }
                }
            } else {
                gameState[roundKey].matches[matchKey] = {
                    ...match,
                    team2: {
                        ...match.team2,
                        [player]: input.value
                    }
                }
            }

            // setGameData([
            //     ...gameData
            // ]);
            pushGameState(socket, sessionId, gameState)

            setInput({
                ...input,
                editing: false,
                edited: true
            });
        }
    }

    let clickHoldTimer: any = null;

    const handlePress = () => {
        clickHoldTimer = setTimeout(() => {
            setInput({
                ...input,
                editing: true
            });
        }, 500);
    }

    const handleRelease = () => {
        clearTimeout(clickHoldTimer);
    }

    return (
        <Grid item xs>
            {!input.editing
            ? <Box
                onMouseDown={handlePress}
                onTouchStart={handlePress}
                onMouseUp={handleRelease}
                onTouchEnd={handleRelease}
                onTouchCancel={handleRelease}
            >
                <Typography 
                    variant="overline"
                    className="player-name"
                >
                    {playerName}
                </Typography>
            </Box>
            : <TextField 
                autoFocus
                id={`inputPlayer-${playerName}-${roundKey}-${matchKey}`}
                className={"text-input"}
                variant="outlined" 
                size="small"
                type="text" 
                placeholder={playerName}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                onBlur={handleOnBlur}
                name={playerName}
            />
            }
        </Grid>
    );
}

export default Player;