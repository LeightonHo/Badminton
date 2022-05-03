import React, { useState, KeyboardEvent } from "react";
import { TextField } from "@material-ui/core";
import { addPlayer } from "../../helpers/Socket";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

const PlayerForm = () => {
    const { sessionId } = useSelector((state: RootState) => state.general);
    const { players } = useSelector((state: RootState) => state.config);
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value);
    }

    const handleClick = (): void => {
        if (!input || isDuplicate(input)) {
            return;
        }

        addPlayer(sessionId, input.trim(), input.trim(), "");
        setInput("");
        setError("");
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            handleClick();
        }
    }

    const isDuplicate = (name: string): boolean => {
        for (const player of players) {
            if (player.alias.toLowerCase() === name.toLowerCase()) {
                setError("This player is already in the list");
                return true;
            }
        }

        return false;
    }

    const getHelperText = () => {
        if (!!error) {
            return error;
        }

        return "Press enter to add";
    }

    return (
        <form onSubmit={() => { return false; }}>
            <TextField 
                id="inputPlayer" 
                className="text-input" 
                label="Name" 
                variant="outlined" 
                size="small"
                type="text" 
                value={input}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                name="name"
                helperText={getHelperText()}
                fullWidth
                error={!!error}
            />
        </form>
    );
}

export default PlayerForm;