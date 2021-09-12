import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { IState as Props } from "./Main";

interface IProps {
    config: Props["config"],
    setConfig: React.Dispatch<React.SetStateAction<Props["config"]>>
}

const CourtForm: React.FC<IProps> = ({ config, setConfig }) => {

    const [input, setInput] = useState({
        court: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleClick = (): void => {
        if (!input.court || isDuplicate(input.court)) {
            return;
        }

        setConfig({
            ...config,
            courts: [
                ...config.courts,
                input.court
            ]
        })

        setInput({
            court: ""
        });
    }

    const isDuplicate = (name: string): boolean => {
        for (const court of config.courts) {
            if (court.toLowerCase() === input.court.toLowerCase()) {
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
                label="Court" 
                variant="outlined" 
                size="small"
                type="text" 
                value={input.court}
                onChange={handleChange}
                name="court"
            />
            <Button 
                variant="contained" 
                color="primary"
                onClick={handleClick}
            >
                Add
            </Button>
        </Box>
    );
}

export default CourtForm;