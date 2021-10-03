import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { IState as Props } from "./Main";
import { joinSession, leaveSession } from "../functions/SocketHelper";

interface IProps {
    socket: Props["socket"],
    setGameState: React.Dispatch<React.SetStateAction<Props["gameState"]>>,
    sessionId: string,
    setSessionId: React.Dispatch<React.SetStateAction<string>>,
    joinedSession: boolean,
    setJoinedSession: React.Dispatch<React.SetStateAction<boolean>>
    setIsHost: React.Dispatch<React.SetStateAction<boolean>>
}

const Lobby: React.FunctionComponent<IProps> = ({ socket, setGameState, sessionId, setSessionId, joinedSession, setJoinedSession, setIsHost }) => {

    const history = useHistory();
    const [error, setError] = useState<string>("");
    const [disableInputs, setDisableInputs] = useState<boolean>(false);
    const handleSessionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSessionId(e.target.value);
    }

    useEffect(() => {
        // Scenario where the session join was successful.
        if (joinedSession) {
            setError("");
            setDisableInputs(false);
        }

        // Scenario where the session was unable to be joined.
        if (!sessionId && disableInputs) {
            setError("Unable to join the session.");
            setDisableInputs(false);
        }
    }, [joinedSession, sessionId]);

    const createSession = () => {
        // TODO: session ID should be generated on the server.
        const sessionId = generateSessionId(4);
        const payload: any = {
            action: "session",
            method: "create",
            sessionId: sessionId
        };

        socket.send(JSON.stringify(payload));
        setDisableInputs(true);
        setJoinedSession(true);
        setSessionId(sessionId);
        setIsHost(true);
        setError("");
    }

    const handleJoinClick = () => {
        setDisableInputs(true);
        setError("");
        joinSession(socket, sessionId);
        setIsHost(false);
    }

    const handleLeaveClick = () => {
        leaveSession(socket, sessionId);
        setGameState([]);
        setJoinedSession(false);
        setSessionId("");
        setIsHost(false);
        setError("");
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
                        If you have a session code, enter it below and click "Join".  Otherwise click "Create" to start a new session.
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
                        disabled={joinedSession}
                        error={error != "" ? true : false}
                        helperText={error}
                    />

                    List of players here
                </CardContent>
            </Card>
            <Box className="config-buttons">
                {!joinedSession 
                ? <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleJoinClick}
                        disabled={disableInputs}
                    >
                        Join Session
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={createSession}
                        disabled={disableInputs}
                    >
                        Create Session
                    </Button>
                </>
                :
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLeaveClick}
                    disabled={disableInputs}
                >
                    Leave Session
                </Button>
                }
            </Box>
        </Box>
    );
}

export default Lobby;