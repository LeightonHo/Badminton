import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemAvatar, ListItemText, Switch, IconButton, List, ListItem, ListItemSecondaryAction, Badge, makeStyles } from "@material-ui/core";
import { removePlayer } from "../helpers/Socket";
import { IPlayer } from "../types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { updatePlayer } from "../redux/Config";
import PlayerAvatar from "./PlayerAvatar";

const useStyles = makeStyles({
    activeBadge: {
        backgroundColor: "#44b700",
        boxShadow: "0 0 0 2px white",
    },
    inactiveBadge: {
        backgroundColor: "#ef0000",
        boxShadow: "0 0 0 2px white",
    }
});

const PlayerList = () => {
    const { sessionId, isHost, isSessionActive } = useSelector((state: RootState) => state.general);
    const { players } = useSelector((state: RootState) => state.config);
    const dispatch = useDispatch();
    const classes = useStyles();

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
                    style={{
                        backgroundColor: key % 2 ? "#fafafa" : "#f1f1f1"
                    }}
                >
                    <ListItemAvatar>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                            classes={{ badge: player.active ? classes.activeBadge : classes.inactiveBadge }}
                        >
                            <PlayerAvatar 
                                id={player.userId}
                                name={player.alias}
                                src={player.avatarUrl}
                            />
                        </Badge>
                    </ListItemAvatar>
                    <ListItemText>{player.alias}</ListItemText>
                    {
                        isHost && isSessionActive
                            ? <ListItemSecondaryAction>
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
        <List>
            {renderList()}
        </List>
    );
}

export default PlayerList;