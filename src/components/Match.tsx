import { Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { IMatch, IProps as Props } from "./RoundRobin";

interface IProps {
    match: IMatch,
    gameData: Props["gameData"],
    setGameData: React.Dispatch<React.SetStateAction<Props["gameData"]>>,
    roundKey: number,
    matchKey: number
}

const Match: React.FC<IProps> = ({ match, gameData, setGameData, roundKey, matchKey }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
                    <Typography 
                        variant="overline"
                        className="player-name"
                    >
                        {match.team1.player1}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography 
                        variant="overline"
                        className="player-name"
                    >
                        {match.team1.player2}
                    </Typography>
                </Grid>
                <Grid item xs className="score-input-grid-item">
                    <TextField
                        variant="outlined"
                        type="number"
                        onChange={handleChange}
                        name="team1Score"
                        placeholder={match.team2.score.toString()}
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
                    <Typography 
                        variant="overline"
                        className="player-name"
                    >
                        {match.team2.player3}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography 
                        variant="overline"
                        className="player-name"
                    >
                        {match.team2.player4}
                    </Typography>
                </Grid>
                <Grid item xs className="score-input-grid-item">
                    <TextField
                        variant="outlined"
                        type="number"
                        onChange={handleChange}
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