import React, { useState } from "react";
import {IState as Props} from "./Main";
import { Box, Button, TextField } from "@material-ui/core";

interface IProps {
    config: Props["config"],
    setConfig: React.Dispatch<React.SetStateAction<Props["config"]>>
}

const PlayerForm: React.FC<IProps> = ({ config, setConfig }) => {

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

        setConfig({
            ...config,
            players: [
                ...config.players,
                input.name
            ]
        });

        setInput({
            name: ""
        });
    }

    const isDuplicate = (name: string): boolean => {
        for (const player of config.players) {
            if (player.toLowerCase() === input.name.toLowerCase()) {
                return true;
            }
        }

        return false;
    }

    return (
        <Box>
            <TextField 
                id="inputPlayer" 
                className="text-input" 
                label="Name" 
                variant="outlined" 
                size="small"
                type="text" 
                value={input.name}
                onChange={handleChange}
                name="name"
            />
            <Button variant="contained" color="primary"
                onClick={handleClick}
            >
                Add
            </Button>
        </Box>
    );
}

export default PlayerForm;