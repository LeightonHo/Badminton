import React from "react";
import { IState as Props } from "./Main";
import DeleteIcon from '@material-ui/icons/Delete';
import { Avatar, ListItemAvatar, ListItemText, Switch, IconButton, List, ListItem, ListItemSecondaryAction } from "@material-ui/core";
import { removePlayer, togglePlayer } from "../helpers/Socket";
import { IPlayer } from "../types";
import { confirmAlert } from "react-confirm-alert";

interface IProps {
    sessionId: string,
    config: Props["config"],
    setConfig: React.Dispatch<React.SetStateAction<Props["config"]>>,
    isHost: boolean
}

const PlayerList: React.FC<IProps> = ({ sessionId, config, isHost }) => {

    const handleDelete = (player: IPlayer): void => {
        confirmAlert({
            title: "Confirm Delete",
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
        togglePlayer(sessionId, userId);
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
                            onClick={() => { handleTogglePlayer(player.userId); }}
                            style={{
                                border: player.active && false ? '4px solid #55b300' : ""
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