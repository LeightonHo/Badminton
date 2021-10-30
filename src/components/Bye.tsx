import { Avatar, Box, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import { useSelector } from "react-redux";
import { updateBye } from "../helpers/Socket";
import { RootState } from "../redux/Store";
import { IPlayer } from "../types";

interface IProps {
    byeKey: number,
    player: IPlayer,
    roundKey: number
}

const Bye: React.FC<IProps> = ({ byeKey, player, roundKey }) => {
    const { sessionId, isHost, isConnected } = useSelector((state: RootState) => state.general);
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
            {
                !input.editing
                ? <Box style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: "200px",
                    paddingTop: "2px",
                    paddingBottom: "2px"
                }}
                    // onMouseDown={handlePress}
                    // onTouchStart={handlePress}
                    // onMouseUp={handleRelease}
                    // onMouseMove={handleRelease}
                    // onTouchEnd={handleRelease}
                    // onTouchCancel={handleRelease}
                    // onTouchMove={handleRelease}
                >
                    <Avatar style={{ 
                        height: "25px",
                        width: "25px",
                        marginRight: "5px"
                    }}>
                        <img src={player.avatarUrl} alt="avatar" height="25px" width="25px" />
                    </Avatar>
                    <Typography
                        variant="overline"
                        align="center"
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
                    id={`inputBye-${player}-${byeKey}`}
                    className="text-input"
                    variant="outlined" 
                    size="small"
                    type="text" 
                    placeholder={player.alias}
                    onChange={handlePlayerChange}
                    onKeyPress={handlePlayerKeyPress}
                    onBlur={handleOnBlur}
                    name={player.alias}
                />
            }
        </>
    );
}

export default Bye;