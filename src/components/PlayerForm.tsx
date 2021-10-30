import React, { useState, KeyboardEvent } from "react";
import { Box, TextField } from "@material-ui/core";
import { addPlayer } from "../helpers/Socket";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

const PlayerForm = () => {
    const { sessionId } = useSelector((state: RootState) => state.general);
    const { players } = useSelector((state: RootState) => state.config);
    const [input, setInput] = useState({
        name: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleClick = (): void => {
        if (!input.name || isDuplicate(input.name)) {
            return;
        }

        addPlayer(sessionId, input.name.trim(), input.name.trim(), "");
        setInput({
            name: ""
        });
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            handleClick();
        }
    }

    const isDuplicate = (name: string): boolean => {
        for (const player of players) {
            if (player.alias.toLowerCase() === name.toLowerCase()) {
                return true;
            }
        }

        return false;
    }

    return (
        <Box className="box-text-input">
            <TextField 
                id="inputPlayer" 
                className="text-input" 
                label="Name" 
                variant="outlined" 
                size="small"
                type="text" 
                value={input.name}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                name="name"
                helperText="Press enter to add"
            />
        </Box>
    );
}

export default PlayerForm;