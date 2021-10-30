import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { createSession, joinSession, leaveSession, endSession } from "../helpers/Socket";
import Configuration from "./Configuration";
import { useDispatch, useSelector } from "react-redux";
import { setConfig } from "../redux/Config";
import { setGameState } from "../redux/GameState";
import { RootState } from "../redux/Store";
import { setIsLoading, setJoinedSession, setSessionId } from "../redux/General";
import { confirmAlert } from "react-confirm-alert";
import { setError } from "../redux/Lobby";

const Lobby = () => {
    const dispatch = useDispatch();
    const { sessionId, isHost, isGuest, isLoading, joinedSession, isSessionActive } = useSelector((state: RootState) => state.general);
    const { error } = useSelector((state: RootState) => state.lobby);
    const [sessionCode, setSessionCode] = useState(sessionId);

    const handleSessionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (error) {
            dispatch(setError(""));
        }

        setSessionCode(e.target.value.toUpperCase());
    }

    const handleCreateSessionClick = () => {
        createSession();
        dispatch(setError(""));
    }

    const handleJoinSessionClick = () => {
        if (!sessionCode) {
            dispatch(setError("Session code cannot be blank."));
            return;
        }

        dispatch(setError(""));
        dispatch(setIsLoading(true));
        joinSession(sessionCode);
    }

    const handleLeaveSessionClick = () => {
        window.scrollTo({ top: 0 });
        leaveSession(sessionId);

        dispatch(setGameState({
            rounds: []
        }));
        dispatch(setConfig({
            courts: [],
            players: []
        }));
        dispatch(setSessionId(""));
        dispatch(setJoinedSession(false));
        dispatch(setError(""));
    }

    const handleEndSessionClick = () => { 
        confirmAlert({
            title: "Confirm",
            message: "Are you sure you want to end the session?  Scores will be locked and you won't be able to generate any more rounds.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        dispatch(setIsLoading(true));
                        endSession(sessionId);
                    }
                },
                {
                    label: "No",
                    onClick: () => { }
                }
            ]
        });
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
                        error={error ? true : false}
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
                            onClick={handleJoinSessionClick}
                            disabled={isLoading}
                        >
                            Join Session
                        </Button>
                        {
                            !isGuest
                            ? <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateSessionClick}
                                disabled={isLoading}
                            >
                                Create Session
                            </Button>
                            : ""
                        }
                    </>
                    : ""
                }

                {
                    joinedSession && isHost && isSessionActive
                    ?  <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleEndSessionClick}
                        disabled={isLoading}
                    >
                        End Session
                    </Button>
                    : ""
                }

                {
                    joinedSession && (!isHost || isHost && !isSessionActive)
                    ? <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLeaveSessionClick}
                        disabled={isLoading}
                    >
                        Leave Session
                    </Button>
                    : ""
                }
            </Box>
        </>
    );
}

export default Lobby;