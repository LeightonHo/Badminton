import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { createSession, joinSession, leaveSession } from "../helpers/Socket";
import Configuration from "./Configuration";
import Progress from "./Progress";
import { useDispatch, useSelector } from "react-redux";
import { syncConfig } from "../redux/Config";
import { syncGameState } from "../redux/GameState";
import { RootState } from "../redux/Store";
import { setIsLoading, setJoinedSession } from "../redux/General";

interface IProps {
    sessionId: string,
    setSessionId: React.Dispatch<React.SetStateAction<string>>
}

const Lobby: React.FunctionComponent<IProps> = ({ sessionId, setSessionId }) => {
    const dispatch = useDispatch();
    const { isLoading, joinedSession } = useSelector((state: RootState) => state.general);
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
    }, [isLoading, joinedSession, sessionId]);

    const handleCreateSession = () => {
        const sessionId = createSession();

        setLoading(true);
        setSessionId(sessionId);
        setError("");
    }

    const handleJoinClick = () => {
        if (!sessionId) {
            setError("Session code cannot be blank.");
            return;
        }

        dispatch(setIsLoading(true));
        setError("");
        joinSession(sessionId);
    }

    const handleLeaveClick = () => {
        leaveSession(sessionId);

        dispatch(syncGameState({
            rounds: []
        }));

        dispatch(syncConfig({
            courts: [],
            players: []
        }));
        
        dispatch(setJoinedSession(false));
        setError("");
    }

    return (
        <Box className="main-content">
            {
                isLoading
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
                ? <Configuration sessionId={sessionId} />
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