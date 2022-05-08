import { Box, Typography } from "@material-ui/core";
import { IPlayer } from "../../types";
import PlayerAvatar from "../../components/PlayerAvatar";

interface IProps {
    byeKey: number,
    player: IPlayer,
    roundKey: number
}

const Bye: React.FC<IProps> = ({ byeKey, player, roundKey }) => {
    return (
        <Box style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "200px",
            paddingTop: "2px"
        }}>
            <PlayerAvatar 
                id={player.userId}
                name={player.alias}
                src={player.avatarUrl}
                style={{ 
                    height: "25px",
                    width: "25px",
                    margin: "0 5px 0 0",
                    fontSize: "14px"
                }}
            />
            
            <Typography
                align="center"
                style={{
                    fontSize: "15px",
                    padding: "5px"
                }}
            >
                {player.alias}
            </Typography>
        </Box>
    );
}

export default Bye;