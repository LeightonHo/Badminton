import { Box, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import { IState as Props} from "./Main";

interface IProps {
    byeKey: number,
    player: string,
    gameData: Props["gameState"],
    setGameData: React.Dispatch<React.SetStateAction<Props["gameState"]>>,
    roundKey: number
}

const Bye: React.FC<IProps> = ({ byeKey, player, gameData, setGameData, roundKey }) => {

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
            gameData[roundKey].byes.splice(gameData[roundKey].byes.indexOf(player), 1);
            gameData[roundKey].byes.push(input.value);

            setGameData([
                ...gameData
            ]);

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