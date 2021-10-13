import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Player from "./Player";
import { IMatch } from "./RoundRobin";
import Score from "./Score";

interface IProps {
    match: IMatch,
    roundKey: number,
    matchKey: number,
    sessionId: string,
    isHost: boolean,
    isConnected: boolean
}

const Match: React.FC<IProps> = ({ match, roundKey, matchKey, sessionId, isHost, isConnected }) => {

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
                    player={1}
                    name={match.team1.player1.alias}
                    roundKey={roundKey} 
                    matchKey={matchKey}
                    sessionId={sessionId}
                    isHost={isHost}
                    isConnected={isConnected}
                />
                <Player 
                    player={2}
                    name={match.team1.player2.alias}
                    roundKey={roundKey}
                    matchKey={matchKey}
                    sessionId={sessionId}
                    isHost={isHost}
                    isConnected={isConnected}
                />
                <Score 
                    team={1} 
                    score={match.team1.score} 
                    roundKey={roundKey} 
                    matchKey={matchKey}
                    sessionId={sessionId} 
                    isConnected={isConnected}
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
                    player={3}
                    name={match.team2.player3.alias}
                    roundKey={roundKey} 
                    matchKey={matchKey}
                    sessionId={sessionId}
                    isHost={isHost}
                    isConnected={isConnected}
                />
                <Player 
                    player={4}
                    name={match.team2.player4.alias}
                    roundKey={roundKey} 
                    matchKey={matchKey}
                    sessionId={sessionId}
                    isHost={isHost}
                    isConnected={isConnected}
                />
                <Score 
                    team={2} 
                    score={match.team2.score} 
                    roundKey={roundKey}
                    matchKey={matchKey} 
                    sessionId={sessionId} 
                    isConnected={isConnected}
                />
            </Grid>
        </Grid>
    );
}

export default Match;