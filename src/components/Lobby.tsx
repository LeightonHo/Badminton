import { Box, Button, Card, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { IState as Props } from "./Main";

interface IProps {
    socket: WebSocket,
    gameData: Props["gameData"]
}

const Lobby: React.FunctionComponent<IProps> = ({ socket, gameData }) => {

    const [input, setInput] = useState({
        sessionId: ""
    });

    const handleSessionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({
            ...input,
            sessionId: e.target.value
        });
    }

    const joinSession = () => {
        const payload: any = {
            action: "session",
            method: "join",
            sessionId: input.sessionId
        }

        console.log(`Joining session..`, payload);
        socket.send(JSON.stringify(payload));
    }

    const createSession = () => {
        // TODO: check for clashes.
        const sessionId = generateSessionId(4);
        const payload: any = {
            action: "session",
            method: "create",
            sessionId: sessionId
        };

        console.log(`Creating session..`, payload);
        socket.send(JSON.stringify(payload));

        setInput({
            ...input,
            sessionId: sessionId
        });
    }

    const generateSessionId = (length: number) => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return result;
    }

    const pushGameState = () => {
        const payload: any = {
            action: "session",
            method: "pushGameState",
            sessionId: input.sessionId,
            gameState: JSON.stringify(gameData)
        }

        console.log(`Pushing game state..`, payload);
        socket.send(JSON.stringify(payload));
    }

    return (
        <Card className="card">
            <TextField
                id="inputSession"
                type="text"
                variant="outlined"
                size="small"
                fullWidth
                onChange={handleSessionChange}
                name="session"
                className="general-input"
                value={input.sessionId}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={joinSession}
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

            <Button
                variant="contained"
                color="primary"
                onClick={pushGameState}
            >
                Push game state
            </Button>
        </Card>
    );
}

export default Lobby;