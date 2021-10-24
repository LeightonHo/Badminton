import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Player from "./Player";
import Score from "./Score";
import { IMatch } from "../types";

interface IProps {
    match: IMatch,
    roundKey: number,
    matchKey: number
}

const Match: React.FC<IProps> = ({ match, roundKey, matchKey }) => {

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
                <Player 
                    playerKey={1}
                    player={match.team1.player1}
                    roundKey={roundKey} 
                    matchKey={matchKey}
                />
                <Player 
                    playerKey={2}
                    player={match.team1.player2}
                    roundKey={roundKey}
                    matchKey={matchKey}
                />
                <Score 
                    team={1} 
                    score={match.team1.score} 
                    roundKey={roundKey} 
                    matchKey={matchKey}
                />
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
                <Player 
                    playerKey={3}
                    player={match.team2.player3}
                    roundKey={roundKey} 
                    matchKey={matchKey}
                />
                <Player 
                    playerKey={4}
                    player={match.team2.player4}
                    roundKey={roundKey} 
                    matchKey={matchKey}
                />
                <Score 
                    team={2} 
                    score={match.team2.score} 
                    roundKey={roundKey}
                    matchKey={matchKey} 
                />
            </Grid>
        </Grid>
    );
}

export default Match;