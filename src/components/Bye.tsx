import { Box, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import { IState as Props} from "./Main";
import { pushGameState } from "../functions/SocketHelper";

interface IProps {
    byeKey: number,
    player: string,
    gameState: Props["gameState"],
    setGameState: React.Dispatch<React.SetStateAction<Props["gameState"]>>,
    roundKey: number,
    socket: WebSocket,
    sessionId: string
}

const Bye: React.FC<IProps> = ({ byeKey, player, gameState: gameState, setGameState, roundKey, socket, sessionId }) => {

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

            // Remove the existing bye and add the new one.
            gameState[roundKey].byes.splice(gameState[roundKey].byes.indexOf(player), 1);
            gameState[roundKey].byes.push(input.value);

            // setGameState([
            //     ...gameState
            // ]);
            pushGameState(socket, sessionId, gameState);

            setInput({
                ...input,
                editing: false
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
        <>
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