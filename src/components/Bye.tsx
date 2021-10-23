import { Box, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import { updateBye } from "../helpers/Socket";

interface IProps {
    byeKey: number,
    player: string,
    roundKey: number,
    sessionId: string,
    isHost: boolean,
    isConnected: boolean
}

const Bye: React.FC<IProps> = ({ byeKey, player, roundKey, sessionId, isHost, isConnected }) => {

    const [input, setInput] = useState({
        previousValue: "",
        value: "",
        editing: false
    });

    const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handlePlayerKeyPress = (e: KeyboardEvent): void => {
        if (e.key === "Enter" || e.key === "Escape") {
            if (input.value === "") {
                setInput({
                    ...input,
                    editing: false
                });
    
                return;
            }

            updateBye(sessionId, roundKey, byeKey, input.value);
            setInput({
                ...input,
                editing: false
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
        <>
            {!input.editing
            ? <Box 
                // onMouseDown={handlePress}
                // onTouchStart={handlePress}
                // onMouseUp={handleRelease}
                // onMouseMove={handleRelease}
                // onTouchEnd={handleRelease}
                // onTouchCancel={handleRelease}
                // onTouchMove={handleRelease}
            >
                <Typography
                    variant="overline"
                    align="center"
                    className="player-name"
                >
                    {player}
                </Typography>
            </Box>
            : <TextField 
                autoFocus
                id={`inputBye-${player}-${byeKey}`}
                className="text-input"
                variant="outlined" 
                size="small"
                type="text" 
                placeholder={player}
                onChange={handlePlayerChange}
                onKeyPress={handlePlayerKeyPress}
                onBlur={handleOnBlur}
                name={player}
            />
            }
        </>
    );
}

export default Bye;