import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { IMatch, IProps as Props } from "./RoundRobin";

interface IProps {
    match: IMatch,
    players: Props["players"],
    setPlayers: React.Dispatch<React.SetStateAction<Props["players"]>>
}

const Match: React.FC<IProps> = ({ match, players, setPlayers }) => {

    const [input, setInput] = useState({
        hasUpdated: false,
        team1Score: 0,
        team2Score: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        console.log({ [e.target.name]: e.target.value });

        console.log(input.team1Score)
        console.log(input.team2Score)

        if (input.hasUpdated) {
            // Reverse the scores;
            updateScores(-1);
        }

        // TODO: potentially make this threshold settings driven since sometimes we play to 17.
        if (input.team1Score < 21 && input.team2Score < 21) {
            return;
        }

        updateScores(1);

        setInput({
            ...input,
            hasUpdated: true
        });
    }

    const updateScores = (points: number): void => {
        let winners = [];
        let losers = [];

        if (input.team1Score > input.team2Score) {
            // team 1 wins
            // if team1 score is higher than 21 then get the players in team 1 and +1 to their wins
            winners = [match.team1.player1, match.team1.player2];
            losers = [match.team2.player3, match.team2.player4];
        } else {
            winners = [match.team2.player3, match.team2.player4];
            losers = [match.team1.player1, match.team1.player2];
        }

        //  update scores of the players
        for (let i = 0; i < players.length; i++) {
            if (winners.indexOf(players[i].name) >= 0) {
                console.log(`Adding ${points} to ${players[i].name}'s wins`)
                players[i].win += points;
            }

            if (losers.indexOf(players[i].name) >= 0) {
                console.log(`Adding ${points} to ${players[i].name}'s losses`)
                players[i].loss += points;
            }
        }

        setPlayers([
            ...players
        ]);
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
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Match;