import { Box, Grid } from "@material-ui/core";
import React from "react";
import { IMatch } from "./RoundRobin";

interface IProps {
    match: IMatch
}

const Match: React.FC<IProps> = ({ match }) => {
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
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Match;