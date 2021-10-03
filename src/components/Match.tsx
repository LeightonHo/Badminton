import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Player from "./Player";
import { IMatch, IProps as Props } from "./RoundRobin";
import Score from "./Score";

interface IProps {
    match: IMatch,
    roundKey: number,
    matchKey: number,
    socket: WebSocket,
    sessionId: string,
    isHost: boolean
}

const Match: React.FC<IProps> = ({ match, roundKey, matchKey, socket, sessionId, isHost }) => {

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
                    name={match.team1.player1}
                    roundKey={roundKey} 
                    matchKey={matchKey}
                    socket={socket}
                    sessionId={sessionId}
                    isHost={isHost}
                />
                <Player 
                    player={2}
                    name={match.team1.player2}
                    roundKey={roundKey}
                    matchKey={matchKey}
                    socket={socket}
                    sessionId={sessionId}
                    isHost={isHost}
                />
                <Score 
                    team={1} 
                    score={match.team1.score} 
                    roundKey={roundKey} 
                    matchKey={matchKey} 
                    socket={socket} 
                    sessionId={sessionId} 
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
                    name={match.team2.player3}
                    roundKey={roundKey} 
                    matchKey={matchKey}
                    socket={socket}
                    sessionId={sessionId}
                    isHost={isHost}
                />
                <Player 
                    player={4}
                    name={match.team2.player4}
                    roundKey={roundKey} 
                    matchKey={matchKey}
                    socket={socket}
                    sessionId={sessionId}
                    isHost={isHost}
                />
                <Score 
                    team={2} 
                    score={match.team2.score} 
                    roundKey={roundKey}
                    matchKey={matchKey} 
                    socket={socket} 
                    sessionId={sessionId} 
                />
            </Grid>
        </Grid>
    );
}

export default Match;