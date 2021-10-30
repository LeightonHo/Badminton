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
            message: `Are you sure you want to remove ${player.alias} from the session?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        removePlayer(sessionId, player.userId);
                    }
                },
                {
                    label: "No",
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
                        <Avatar
                            style={{
                                border: player.active ? "3px solid #55b300" : "3px solid red"
                            }}
                        >
                            <img src={player.avatarUrl} alt="avatar image" height="50px" width="50px" />
                        </Avatar>
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