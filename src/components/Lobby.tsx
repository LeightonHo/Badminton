import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { IState as Props } from "./Main";

interface IProps {
    socket: WebSocket,
    gameState: Props["gameState"],
    sessionId: string,
    setSessionId: React.Dispatch<React.SetStateAction<string>>
}

const Lobby: React.FunctionComponent<IProps> = ({ socket, gameState, sessionId, setSessionId }) => {

    const handleSessionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSessionId(e.target.value);
    }

    const joinSession = () => {
        const payload: any = {
            action: "session",
            method: "join",
            sessionId: sessionId
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

        setSessionId(sessionId);
    }

    const generateSessionId = (length: number) => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return result;
    }

    return (
        <Box>
            <Card className="card">
                <CardContent className="general-card">
                    <Typography
                        variant="h5"
                    >
                        Lobby
                    </Typography>
                    <Typography
                        variant="subtitle2"
                    >
                        If you have a session code, enter it below and hit "Join".  Otherwise click "Create" to generate a new session.
                    </Typography>
                    <TextField
                        id="inputSession"
                        label="Session Code"
                        type="text"
                        variant="outlined"
                        size="small"
                        onChange={handleSessionChange}
                        name="session"
                        className="general-input"
                        value={sessionId}
                        fullWidth
                    />
                </CardContent>
            </Card>
            <Box className="config-buttons">
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
            </Box>
        </Box>
    );
}

export default Lobby;