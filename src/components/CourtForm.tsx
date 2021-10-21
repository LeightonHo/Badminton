import { Box, TextField } from "@material-ui/core";
import React, { useState, KeyboardEvent} from "react";
import { IState as Props } from "./Main";
import { addCourt } from "../helpers/Socket";

interface IProps {
    sessionId: string,
    config: Props["config"]
}

const CourtForm: React.FC<IProps> = ({ sessionId, config }) => {

    const [input, setInput] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value.trim());
    }

    const handleClick = (): void => {
        if (!input || isDuplicate(input)) {
            return;
        }

        addCourt(sessionId, input);
        setInput("");
    }

    const isDuplicate = (input: string): boolean => {
        for (const court of config.courts) {
            if (court.toLowerCase() === input.toLowerCase()) {
                return true;
            }
        }

        return false;
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            handleClick();
        }
    }

    return (
        <Box
            className="box-text-input"
        >
            <TextField 
                id="inputCourt" 
                className="text-input" 
                label="Court" 
                variant="outlined" 
                size="small"
                type="text" 
                value={input}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                name="court"
                helperText="Press enter to add"
            />
        </Box>
    );
}

export default CourtForm;