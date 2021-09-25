import { Box, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import { IState as Props} from "./Main";

interface IProps {
    player: string,
    gameData: Props["gameData"],
    setGameData: React.Dispatch<React.SetStateAction<Props["gameData"]>>,
    roundKey: number
}

const Bye: React.FC<IProps> = ({ player, gameData, setGameData, roundKey }) => {

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

    const handleMouseDown = () => {
        clickHoldTimer = setTimeout(() => {
            setInput({
                ...input,
                editing: true
            });
        }, 500);
    }

    const handleMouseUp = () => {
        clearTimeout(clickHoldTimer);
    }

    const handlePlayerClick = (e: React.MouseEvent<HTMLElement>): void => {
        setInput({
            ...input,
            editing: true
        });
    }

    return (
        <>
            <Box 
                onContextMenu={handlePlayerClick}
                className={input.editing ? "hide" : "show"}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                <Typography
                    variant="overline"
                    align="center"
                >
                    {player}
                </Typography>
            </Box>
            <TextField 
                id="inputBye"
                className={"text-input " + (input.editing ? "show" : "hide")}
                variant="outlined" 
                size="small"
                type="text" 
                placeholder={player}
                onChange={handlePlayerChange}
                onKeyPress={handlePlayerKeyPress}
                name={player}
            />
        </>
    );
}

export default Bye;