import { Box, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import { IProps as Props } from "./RoundRobin";

interface IProps {
    player: string,
    gameData: Props["gameData"],
    setGameData: React.Dispatch<React.SetStateAction<Props["gameData"]>>,
    roundKey: number,
    matchKey: number
}

const Player: React.FC<IProps> = ({ player, gameData, setGameData, roundKey, matchKey }) => {

    let playerName = "";
    const match = gameData[roundKey].matches[matchKey];
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
                gameData[roundKey].matches[matchKey] = {
                    ...match,
                    team1: {
                        ...match.team1,
                        [player]: input.value
                    }
                }
            } else {
                gameData[roundKey].matches[matchKey] = {
                    ...match,
                    team2: {
                        ...match.team2,
                        [player]: input.value
                    }
                }
            }

            setGameData([
                ...gameData
            ]);

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