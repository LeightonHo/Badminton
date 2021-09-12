import { Grid } from "@material-ui/core";
import React, { useState } from "react";
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

    const showValue = (score: number): string => {
        if (score > 0) {
            return score.toString();
        }

        return "";
    }

    return (
        <Grid
            container
            direction="row"
            spacing={1}
        >
            <Grid 
                container
                item xs
                direction="column"
            >
                <Grid item xs >
                    <span>{match.team1.player1}</span>
                </Grid>
                <Grid item xs>
                    <span>{match.team1.player2}</span>
                </Grid>
                <Grid item xs>
                    <input 
                        type="number"
                        min="0"
                        max="21"
                        onBlur={handleChange}
                        name="team1Score"
                        placeholder={showValue(match.team1.score)}
                    />
                </Grid>
            </Grid>
            <Grid 
                container
                item xs
                direction="column"
            >
                <Grid item xs>
                    <span>{match.team2.player3}</span>
                </Grid>
                <Grid item xs>
                    <span>{match.team2.player4}</span>
                </Grid>
                <Grid item xs>
                    <input 
                        type="number"
                        min="0"
                        max="21"
                        onBlur={handleChange}
                        name="team2Score"
                        placeholder={showValue(match.team2.score)}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Match;