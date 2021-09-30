import { Box, Button, Card, TextField } from "@material-ui/core";
import React, { useState } from "react";

interface IProps {
    socket: WebSocket
}

const Lobby: React.FunctionComponent<IProps> = ({ socket }) => {

    socket.addEventListener("message", (e: MessageEvent<any>) => {
        console.log(e.data);
        console.log(`Lobby: Response from server: ${JSON.parse(e.data).message}`);
    });

    const [input, setInput] = useState({
        sessionId: ""
    });

    const handleSessionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({
            ...input,
            sessionId: e.target.value
        });
    }

    const createSession = () => {
        const payload: any = {
            action: "session",
            method: "create",
            sessionId: "ABC12345"
        }

        console.log(`Creating session.. ${payload}`);
        socket.send(JSON.stringify(payload));
    }

    return (
        <Card className="card">
            <TextField
                id="inputSession"
                label={`Session ID`}
                type="text"
                variant="outlined"
                size="small"
                fullWidth
                onChange={handleSessionChange}
                name="session"
                className="general-input"
            />

            <Button
                variant="contained"
                color="primary"
                // onClick={clearGameData}
            >
                Join Session
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={createSession}
            >
                Create Session
            </Button>
        </Card>
    );
}

export default Lobby;