import { Box, Grid, Typography } from "@material-ui/core";
import Player from "./Player";
import Score from "./Score";
import { IMatch } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

interface IProps {
    match: IMatch,
    roundKey: number,
    matchKey: number
}

const Match: React.FC<IProps> = ({ match, roundKey, matchKey }) => {
    const { isMobile } = useSelector((state: RootState) => state.general);

    return (
        <Grid
            container
            direction="row"
            spacing={1}
        >
            <Grid
                item xs={1}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}
            >
                <Typography
                    variant="h6"
                    style={{
                        fontSize: "16px"
                    }}
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
                <Box style={{
                    display: isMobile ? "" : "flex"
                }}>
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
                </Box>
                <Box style={{
                    marginTop: isMobile ? "" : "10px"
                }}>
                    <Score 
                        team={1} 
                        score={match.team1.score} 
                        roundKey={roundKey} 
                        matchKey={matchKey}
                    />
                </Box>
            </Grid>
            <Grid
                item xs={1}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}
            >
                <Typography 
                    variant="overline"
                    style={{
                        fontSize: "16px"
                    }}
                >
                    VS
                </Typography>
            </Grid>
            <Grid 
                container
                item xs
                direction="column"
            >
                <Box style={{
                    display: isMobile ? "" : "flex"
                }}>
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
                </Box>
                <Box style={{
                    marginTop: isMobile ? "" : "10px"
                }}>
                    <Score 
                        team={2} 
                        score={match.team2.score} 
                        roundKey={roundKey}
                        matchKey={matchKey} 
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

export default Match;