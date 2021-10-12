import { Backdrop, Box, Button, Card, CardContent, LinearProgress, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { IState as Props } from "./Main";
import { createSession, joinSession, leaveSession } from "../helpers/Socket";
import Configuration from "./Configuration";
import Progress from "./Progress";

interface IProps {
    gameState: Props["gameState"],
    setGameState: React.Dispatch<React.SetStateAction<Props["gameState"]>>,
    config: Props["config"],
    setConfig: React.Dispatch<React.SetStateAction<Props["config"]>>,
    sessionId: string,
    setSessionId: React.Dispatch<React.SetStateAction<string>>,
    joinedSession: boolean,
    setJoinedSession: React.Dispatch<React.SetStateAction<boolean>>,
    isHost: boolean
}

const Lobby: React.FunctionComponent<IProps> = ({ gameState, setGameState, config, setConfig, sessionId, setSessionId, joinedSession, setJoinedSession, isHost }) => {

    const history = useHistory();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const handleSessionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSessionId(e.target.value.toUpperCase());
    }

    useEffect(() => {
        // Scenario where the session join was successful.
        if (joinedSession) {
            setError("");
            setLoading(false);
        }

        // Scenario where the session was unable to be joined.
        if (!sessionId && loading) {
            setError("Unable to join the session.");
            setLoading(false);
        }
    }, [joinedSession, sessionId]);

    const handleCreateSession = () => {
        const sessionId = createSession();

        setLoading(true);
        setSessionId(sessionId);
        setError("");
    }

    const handleJoinClick = () => {
        setLoading(true);
        setError("");
        joinSession(sessionId);
    }

    const handleLeaveClick = () => {
        leaveSession(sessionId);
        setGameState([]);
        setConfig({
            rounds: 15,
            winningScore: 21,
            courts: [],
            players: []
        });
        setJoinedSession(false);
        setError("");
    }

    return (
        <Box>
            {
                loading
                ? <Progress />
                : ""
            }
            <Card className="card">
                <CardContent className="general-card">
                    <Typography
                        variant="h5"
                    >
                        Session
                    </Typography>
                    {
                        !joinedSession
                        ? <Typography variant="subtitle2">If you have a session code, enter it below and click "Join".  Otherwise click "Create" to start a new session.</Typography>
                        : ""
                    }
                    
                    <TextField
                        id="inputSession"
                        label="Code"
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
                </CardContent>
            </Card>
            {
                joinedSession
                ? <Configuration config={config} setConfig={setConfig} gameState={gameState} sessionId={sessionId} isHost={isHost} />
                : ""
            }
            <Box className="config-buttons">
                {!joinedSession 
                ? <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleJoinClick}
                        disabled={loading}
                    >
                        Join Session
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateSession}
                        disabled={loading}
                    >
                        Create Session
                    </Button>
                </>
                :
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLeaveClick}
                    disabled={loading}
                >
                    Leave Session
                </Button>
                }
            </Box>
        </Box>
    );
}

export default Lobby;