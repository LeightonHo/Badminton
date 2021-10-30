import { Avatar, Box, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import { IPlayer } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

interface IProps {
    playerKey: number,
    player: IPlayer,
    roundKey: number,
    matchKey: number
}

const Player: React.FC<IProps> = ({ playerKey, player, roundKey, matchKey }) => {
    const { sessionId, isHost, isConnected } = useSelector((state: RootState) => state.general);
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
            {
                !input.editing
                ? <Box
                    // onMouseDown={handlePress}
                    // onTouchStart={handlePress}
                    // onMouseUp={handleRelease}
                    // onMouseMove={handleRelease}
                    // onTouchEnd={handleRelease}
                    // onTouchCancel={handleRelease}
                    // onTouchMove={handleRelease}
                    className="player-box"
                >
                    {
                        player.avatarUrl
                        ? <Avatar style={{ 
                            margin: "auto",
                            border: "2px solid #d1d1d1"
                        }}>
                            <img src={player.avatarUrl} alt="avatar image" height="50px" width="50px" />
                        </Avatar>
                        : <Avatar style={{ 
                            margin: "auto",
                            border: "2px solid #d1d1d1"
                        }} />
                    }
                    <Typography 
                        variant="overline"
                        style={{
                            fontSize: "15px",
                            cursor: "pointer"
                        }}
                    >
                        {player.alias}
                    </Typography>
                </Box>
                : <TextField 
                    autoFocus
                    id={`inputPlayer-${player.userId}-${roundKey}-${matchKey}`}
                    className={"text-input"}
                    variant="outlined" 
                    size="small"
                    type="text" 
                    placeholder={player.alias}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    onBlur={handleOnBlur}
                    name={player.alias}
                />
            }
        </Grid>
    );
}

export default Player;