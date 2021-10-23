import React, { useEffect, useState } from "react";
import { IState as Props } from "./Main";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, ListItemAvatar, ListItemText, Switch, IconButton, List, ListItem, ListItemSecondaryAction } from "@material-ui/core";
import { removePlayer, togglePlayer } from "../helpers/Socket";
import { IPlayer } from "../types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

interface IProps {
    sessionId: string,
    config: Props["config"],
    setConfig: React.Dispatch<React.SetStateAction<Props["config"]>>,
    isHost: boolean
}

const PlayerList: React.FC<IProps> = ({ sessionId, config, isHost }) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [config.players])

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

    const handleTogglePlayer = (userId: string): void => {
        setLoading(true);
        togglePlayer(sessionId, userId);

        // config.players[key].active = !config.players[key].active;

        // setConfig({
        //     ...config
        // });
    }

    const sortPlayers = (a: IPlayer, b: IPlayer) => {
        if (b.active === a.active) {
            return a.alias.localeCompare(b.alias);
        }

        return Number(b.active) - Number(a.active);
    }

    const renderList = (): JSX.Element[] => {
        return config.players.map((player, key) => {
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
                            <img src={player.avatarUrl} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText>{player.alias}</ListItemText>
                    <ListItemSecondaryAction>
                        <Switch
                            color="primary"
                            checked={player.active}
                            onChange={(() => { handleTogglePlayer(player.userId); })}
                            disabled={!isHost}
                        />
                        {
                            isHost
                            ? <IconButton 
                                edge="end" 
                                aria-label="delete" 
                                onClick={(() => { handleDelete(player); })}
                            >
                                <DeleteIcon /> 
                            </IconButton>
                            : ""
                        }
                    </ListItemSecondaryAction>
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