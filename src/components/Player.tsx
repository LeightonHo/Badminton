import { Avatar, Box, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import { updatePlayer } from "../helpers/Socket";
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
                    {/* <Avatar style={{ margin: "auto", height: "30px", width: "30px" }}> */}
                    <Avatar style={{ margin: "auto" }}>
                        <img src={player.avatarUrl} />
                    </Avatar>
                    <Typography 
                        variant="overline"
                        className="player-name"
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