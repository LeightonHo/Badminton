import { Box, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import { updatePlayer } from "../helpers/Socket";

interface IProps {
    player: number,
    name: string,
    roundKey: number,
    matchKey: number,
    sessionId: string,
    isHost: boolean,
    isConnected: boolean
}

const Player: React.FC<IProps> = ({ player, name, roundKey, matchKey, sessionId, isHost, isConnected }) => {

    const [input, setInput] = useState({
        value: "",
        editing: false,
        edited: false
    });

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

            updatePlayer(sessionId, roundKey, matchKey, player, input.value);
            setInput({
                ...input,
                editing: false,
                edited: true
            });
        }
    }

    let clickHoldTimer: any = null;

    const handlePress = () => {
        if (!isHost || !isConnected) {
            return;
        }

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
                onTouchMove={handleRelease}
            >
                <Typography 
                    variant="overline"
                    className="player-name"
                >
                    {name}
                </Typography>
            </Box>
            : <TextField 
                autoFocus
                id={`inputPlayer-${name}-${roundKey}-${matchKey}`}
                className={"text-input"}
                variant="outlined" 
                size="small"
                type="text" 
                placeholder={name}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                onBlur={handleOnBlur}
                name={name}
            />
            }
        </Grid>
    );
}

export default Player;