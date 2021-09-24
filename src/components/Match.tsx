import { Box, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import { IMatch, IProps as Props } from "./RoundRobin";

interface IProps {
    match: IMatch,
    gameData: Props["gameData"],
    setGameData: React.Dispatch<React.SetStateAction<Props["gameData"]>>,
    roundKey: number,
    matchKey: number
}

const Match: React.FC<IProps> = ({ match, gameData, setGameData, roundKey, matchKey }) => {
    
    const [input, setInput] = useState({
        editPlayer1: false,
        editPlayer2: false,
        editPlayer3: false,
        editPlayer4: false
    })

    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (isNaN(parseInt(e.target.value))) {
            return;
        }

        // Update the game data state
        if (e.target.name === "team1Score") { 
            gameData[roundKey].matches[matchKey] = {
                ...match,
                team1: {
                    ...match.team1,
                    score: parseInt(e.target.value)
                }
            }
        } else {
            gameData[roundKey].matches[matchKey] = {
                ...match,
                team2: {
                    ...match.team2,
                    score: parseInt(e.target.value)
                }
            }
        }

        setGameData([
            ...gameData
        ]);
    }

    const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            return;
        }

        const player = e.target.name;

        if (player === "player1" || player === "player2") { 
            gameData[roundKey].matches[matchKey] = {
                ...match,
                team1: {
                    ...match.team1,
                    [player]: e.target.value
                }
            }
        } else {
            gameData[roundKey].matches[matchKey] = {
                ...match,
                team2: {
                    ...match.team2,
                    [player]: e.target.value
                }
            }
        }

        setGameData([
            ...gameData
        ]);
    }

    const handlePlayerKeyPress = (e: KeyboardEvent, player: string) => {
        if (e.key === "Enter" || e.key === "Escape") {
            setInput({
                ...input,
                [player]: false
            });
        }
    }

    const handlePlayerClick = (e: React.MouseEvent<HTMLElement>, player: string) => {
        setInput({
            ...input,
            [player]: true
        });
    }

    return (
        <Grid
            container
            direction="row"
            spacing={1}
        >
            <Grid
                item xs={1}
                className="vertical-align-center"
            >
                <Typography
                    variant="h6"
                    className="court-number"
                >
                    {match.court}
                </Typography>
            </Grid>
            <Grid 
                container
                item xs
                direction="column"
                justifyContent="center"
            >
                <Grid item xs>
                    <Box
                        onClick={(e) => { handlePlayerClick(e, "editPlayer1") }}
                        className={input.editPlayer1 ? "hide" : "show"}
                    >
                        <Typography 
                            variant="overline"
                            className="player-name"
                        >
                            {match.team1.player1}
                        </Typography>
                    </Box>
                    <TextField 
                        id="inputPlayer1" 
                        className={"text-input " + (input.editPlayer1 ? "show" : "hide")}
                        variant="outlined" 
                        size="small"
                        type="text" 
                        placeholder={match.team1.player1}
                        onChange={handlePlayerChange}
                        onKeyPress={(e) => { handlePlayerKeyPress(e, "editPlayer1") }}
                        name="player1"
                    />
                </Grid>
                <Grid item xs>
                    <Box
                        onClick={(e) => { handlePlayerClick(e, "editPlayer2") }}
                        className={input.editPlayer2 ? "hide" : "show"}
                    >
                        <Typography 
                            variant="overline"
                            className="player-name"
                        >
                            {match.team1.player2}
                        </Typography>
                    </Box>
                    <TextField 
                        id="inputPlayer2" 
                        className={"text-input " + (input.editPlayer2 ? "show" : "hide")}
                        variant="outlined" 
                        size="small"
                        type="text" 
                        placeholder={match.team1.player2}
                        onChange={handlePlayerChange}
                        onKeyPress={(e) => { handlePlayerKeyPress(e, "editPlayer2") }}
                        name="player2"
                    />
                </Grid>
                <Grid item xs className="score-input-grid-item">
                    <TextField
                        variant="outlined"
                        type="number"
                        onChange={handleScoreChange}
                        name="team1Score"
                        placeholder={match.team1.score.toString()}
                        size="small"
                        className="score-input"
                    />
                </Grid>
            </Grid>
            <Grid
                item xs={1}
                className="vertical-align-center"
            >
                <Typography variant="overline">vs</Typography>
            </Grid>
            <Grid 
                container
                item xs
                direction="column"
            >
                <Grid item xs>
                    <Box
                        onClick={(e) => { handlePlayerClick(e, "editPlayer3") }}
                        className={input.editPlayer3 ? "hide" : "show"}
                    >
                        <Typography 
                            variant="overline"
                            className="player-name"
                        >
                            {match.team2.player3}
                        </Typography>
                    </Box>
                    <TextField 
                        id="inputPlayer3" 
                        className={"text-input " + (input.editPlayer3 ? "show" : "hide")}
                        variant="outlined" 
                        size="small"
                        type="text" 
                        placeholder={match.team2.player3}
                        onChange={handlePlayerChange}
                        onKeyPress={(e) => { handlePlayerKeyPress(e, "editPlayer3") }}
                        name="player3"
                    />
                </Grid>
                <Grid item xs>
                    <Box
                        onClick={(e) => { handlePlayerClick(e, "editPlayer4") }}
                        className={input.editPlayer4 ? "hide" : "show"}
                    >
                        <Typography 
                            variant="overline"
                            className="player-name"
                        >
                            {match.team2.player4}
                        </Typography>
                    </Box>
                    <TextField 
                        id="inputPlayer4" 
                        className={"text-input " + (input.editPlayer4 ? "show" : "hide")}
                        variant="outlined" 
                        size="small"
                        type="text" 
                        placeholder={match.team2.player4}
                        onChange={handlePlayerChange}
                        onKeyPress={(e) => { handlePlayerKeyPress(e, "editPlayer4") }}
                        name="player4"
                    />
                </Grid>
                <Grid item xs className="score-input-grid-item">
                    <TextField
                        variant="outlined"
                        type="number"
                        onChange={handleScoreChange}
                        name="team2Score"
                        placeholder={match.team2.score.toString()}
                        size="small"
                        className="score-input"
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Match;