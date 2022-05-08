import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent, useEffect } from "react";
import { createSession, joinSession, leaveSession, endSession } from "../../helpers/Socket";
import Configuration from "./Configuration";
import { useDispatch, useSelector } from "react-redux";
import { setConfig } from "../../redux/Config";
import { setGameState } from "../../redux/GameState";
import { RootState } from "../../redux/Store";
import { setIsLoading, setJoinedSession, setSessionId, setNavigation } from "../../redux/General";
import { confirmAlert } from "react-confirm-alert";
import { setError } from "../../redux/Lobby";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Lobby = () => {
    const dispatch = useDispatch();
    const { userId, sessionId, isHost, isGuest, isLoading, joinedSession, isSessionActive } = useSelector((state: RootState) => state.general);
    const { error } = useSelector((state: RootState) => state.lobby);
    const [sessionCode, setSessionCode] = useState(sessionId);
	const history = useHistory();

    useEffect(() => {
        dispatch(setNavigation("lobby"));
    });

    const handleSessionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.value.length > 4) {
            return;
        }

        if (error) {
            dispatch(setError(""));
        }

        setSessionCode(e.target.value.toUpperCase());
    }

    const handleCreateSessionClick = () => {
        createSession();
        dispatch(setError(""));
    }

    const handleJoinSessionClick = (code: string = sessionCode) => {
        if (!code) {
            dispatch(setError("Session code cannot be blank."));
            return;
        }

        dispatch(setError(""));
        dispatch(setIsLoading(true));
        joinSession(code);
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
        dispatch(setIsLoading(false));

        // Clear out the current session ID.
        localStorage.setItem("crosscourt_user", JSON.stringify({
            ...JSON.parse(localStorage.getItem("crosscourt_user") || ""),
            currentSessionId: ""
        }));

        history.push("/lobby");
    }

    const handleEndSessionClick = () => { 
        confirmAlert({
            title: "Confirm",
            message: "Scores will be locked and you won't be able to generate any more rounds.",
            buttons: [
                {
                    label: "Ok",
                    onClick: () => {
                        dispatch(setIsLoading(true));
                        axios.post<any>(`${process.env.REACT_APP_API_URL}/session/end`, {
                            userId: userId,
                            sessionId: sessionId
                        }).then(() => {
                            endSession(sessionId);
                        }).catch(() => {
                            console.log("There was a problem ending the session.");
                        });
                    }
                },
                {
                    label: "Cancel",
                    onClick: () => { }
                }
            ]
        });
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            handleJoinSessionClick();
        }
    }

    const getDescription = () => {
        if (isGuest) {
            return `Guests can only join sessions.  Log in with Facebook to create sessions.`;
        }

        return `If you have a session code, enter it below and click Join.  Alternatively, click Create to start a new session.`;
    }

    return (
        <>
            {
                joinedSession
                ? <Configuration />
                : <Card className="card">
                    <CardContent className="general-card">
                        <Typography variant="h5">Session</Typography>
                        <Typography variant="subtitle2">{getDescription()}</Typography>
                        
                        <Box style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <TextField
                                id="inputSession"
                                label="Code"
                                type="text"
                                variant="outlined"
                                size="small"
                                onChange={handleSessionChange}
                                onKeyPress={handleKeyPress}
                                name="session"
                                className="general-input"
                                value={sessionCode}
                                fullWidth
                                disabled={joinedSession}
                                error={error ? true : false}
                                helperText={error}
                            />
                        </Box>
                    </CardContent>
                </Card>
            }

            <Box className="config-buttons">
                {
                    !joinedSession
                    ? <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { handleJoinSessionClick(); }}
                            disabled={isLoading}
                            fullWidth
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
                                fullWidth
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
                        fullWidth
                    >
                        End Session
                    </Button>
                    : ""
                }

                {
                    (joinedSession && !isHost) || (joinedSession && isHost && !isSessionActive)
                    ? <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLeaveSessionClick}
                        disabled={isLoading}
                        fullWidth
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