import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { createSession, joinSession, leaveSession } from "../helpers/Socket";
import Configuration from "./Configuration";
import Progress from "./Progress";
import { useDispatch, useSelector } from "react-redux";
import { syncConfig } from "../redux/Config";
import { syncGameState } from "../redux/GameState";
import { RootState } from "../redux/Store";
import { setIsLoading, setJoinedSession, setSessionId } from "../redux/General";

const Lobby = () => {
    const dispatch = useDispatch();
    const { sessionId, isGuest, isLoading, joinedSession } = useSelector((state: RootState) => state.general);
    const [error, setError] = useState<string>("");
    const [sessionCode, setSessionCode] = useState("");

    const handleSessionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSessionCode(e.target.value.toUpperCase());
    }

    useEffect(() => {
        // Scenario where the session join was successful.
        if (joinedSession) {
            setError("");
            dispatch(setIsLoading(false));
        }

        // Scenario where the session was unable to be joined.
        if (!sessionId && isLoading) {
            setError("Unable to join the session.");
            dispatch(setIsLoading(false));
        }
    }, [joinedSession, sessionId]);

    const handleCreateSession = () => {
        createSession();
        setError("");
    }

    const handleJoinClick = () => {
        if (!sessionCode) {
            setError("Session code cannot be blank.");
            return;
        }

        dispatch(setIsLoading(true));
        setError("");
        joinSession(sessionCode);
    }

    const handleLeaveClick = () => {
        window.scrollTo({ top: 0 });
        leaveSession(sessionId);

        dispatch(syncGameState({
            rounds: []
        }));
        dispatch(syncConfig({
            courts: [],
            players: []
        }));
        dispatch(setSessionId(""));
        dispatch(setJoinedSession(false));
        setError("");
    }

    const getDescription = () => {
        if (isGuest) {
            return `Guests can only join sessions.  Log in with Facebook to create sessions.`;
        }

        return `If you have a session code, enter it below and click "Join".  Otherwise click "Create" to start a new session.`;
    }

    return (
        <>
            <Card className="card">
                <CardContent className="general-card">
                    <Typography
                        variant="h5"
                    >
                        Session
                    </Typography>
                    {
                        !joinedSession
                        ? <Typography variant="subtitle2">
                            {getDescription()}
                        </Typography>
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
                        value={sessionCode}
                        fullWidth
                        disabled={joinedSession}
                        error={error != "" ? true : false}
                        helperText={error}
                    />
                </CardContent>
            </Card>
            {
                joinedSession
                ? <Configuration />
                : ""
            }
            <Box className="config-buttons">
                {
                    !joinedSession
                    ? <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleJoinClick}
                            disabled={isLoading}
                        >
                            Join Session
                        </Button>
                        {
                            !isGuest
                            ? <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateSession}
                                disabled={isLoading}
                            >
                                Create Session
                            </Button>
                            : ""
                        }
                    </>
                    : <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLeaveClick}
                        disabled={isLoading}
                    >
                        Leave Session
                    </Button>
                }
            </Box>
        </>
    );
}

export default Lobby;