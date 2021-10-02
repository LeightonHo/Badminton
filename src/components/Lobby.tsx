import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { IState as Props } from "./Main";
import { joinSession, leaveSession } from "../functions/SocketHelper";

interface ILobby {
    sessionId: string,

}

interface IProps {
    socket: Props["socket"],
    gameState: Props["gameState"],
    sessionId: string,
    setSessionId: React.Dispatch<React.SetStateAction<string>>,
    joinedSession: boolean,
    setJoinedSession: React.Dispatch<React.SetStateAction<boolean>>
}

const Lobby: React.FunctionComponent<IProps> = ({ socket, gameState, sessionId, setSessionId, joinedSession, setJoinedSession }) => {

    const history = useHistory();
    const [disableInputs, setDisableInputs] = useState<boolean>(false);
    const handleSessionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSessionId(e.target.value);
    }

    const createSession = () => {
        // TODO: session ID should be generated on the server.
        const sessionId = generateSessionId(4);
        const payload: any = {
            action: "session",
            method: "create",
            sessionId: sessionId
        };

        socket.send(JSON.stringify(payload));
        setSessionId(sessionId);
    }

    const handleJoinClick = () => {
        joinSession(socket, sessionId);
        setDisableInputs(true);
    }

    const handleLeaveClick = () => {
        leaveSession(socket, sessionId);
        setJoinedSession(false);
        setSessionId("");
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