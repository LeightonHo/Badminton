import { Box, Grid, Typography } from "@material-ui/core";
import { IPlayer } from "../types";
import PlayerAvatar from "./PlayerAvatar";

interface IProps {
    playerKey: number,
    player: IPlayer,
    roundKey: number,
    matchKey: number
}

const Player: React.FC<IProps> = ({ playerKey, player, roundKey, matchKey }) => {
    return (
        <Grid item xs>
            <Box className="player-box">
                <PlayerAvatar 
                    id={player.userId}
                    name={player.alias}
                    src={player.avatarUrl}
                />
                <Typography 
                    variant="overline"
                    style={{
                        fontSize: "15px",
                    }}
                >
                    {player.alias}
                </Typography>
            </Box>
        </Grid>
    );
}

export default Player;