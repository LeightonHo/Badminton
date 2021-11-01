import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, ListItemAvatar, ListItemText, Switch, IconButton, List, ListItem, ListItemSecondaryAction } from "@material-ui/core";
import { removePlayer } from "../helpers/Socket";
import { IPlayer } from "../types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { updatePlayer } from "../redux/Config";

const PlayerList = () => {
    const { sessionId, isHost, isSessionActive } = useSelector((state: RootState) => state.general);
    const { players } = useSelector((state: RootState) => state.config);
    const dispatch = useDispatch();

    const handleDelete = (player: IPlayer): void => {
        confirmAlert({
            title: "Confirm",
            message: `Remove ${player.alias} from the session?`,
            buttons: [
                {
                    label: "Ok",
                    onClick: () => {
                        removePlayer(sessionId, player.userId);
                    }
                },
                {
                    label: "Cancel",
                    onClick: () => { }
                }
            ]
        });
    }

    const handleTogglePlayer = (key: number): void => {
        dispatch(updatePlayer({
            userId: players[key].userId,
            alias: players[key].alias,
            avatarUrl: players[key].avatarUrl,
            active: !players[key].active
        }));
    }

    const sortPlayers = (a: IPlayer, b: IPlayer) => {
        if (b.active === a.active) {
            return a.alias.localeCompare(b.alias);
        }

        return Number(b.active) - Number(a.active);
    }

    const renderList = (): JSX.Element[] => {
        return players.map((player, key) => {
            return (
                <ListItem 
                    key={key}
                >
                    <ListItemAvatar>
                        {
                            player.avatarUrl
                            ? <Avatar style={{ border: player.active ? "3px solid #24b300" : "3px solid #ff3434" }}>
                                <img src={player.avatarUrl} alt="avatar" height="50px" width="50px" />
                            </Avatar>
                            : <Avatar style={{ border: player.active ? "3px solid #24b300" : "3px solid #ff3434" }} />
                        }
                    </ListItemAvatar>
                    <ListItemText>{player.alias}</ListItemText>
                    {
                        isHost && isSessionActive
                        ?  <ListItemSecondaryAction>
                            <Switch
                                color="primary"
                                checked={player.active}
                                onChange={(() => { handleTogglePlayer(key); })}
                                disabled={!isHost}
                            />
                            <IconButton 
                                edge="end" 
                                aria-label="delete" 
                                onClick={(() => { handleDelete(player); })}
                            >
                                <DeleteIcon /> 
                            </IconButton>
                        </ListItemSecondaryAction>
                        : ""
                    }
                </ListItem>
            );
        });
    }

    return (
        <List className="player-list-grid">
            {renderList()}
        </List>
    );
}

export default PlayerList;