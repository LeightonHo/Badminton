import React from "react";
import {IState as Props} from "./Main";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItemText } from "@material-ui/core";
import { removePlayer } from "../helpers/Socket";

interface IProps {
    sessionId: string,
    config: Props["config"],
    setConfig: React.Dispatch<React.SetStateAction<Props["config"]>>,
    hasGameStarted: boolean
}

const PlayerList: React.FC<IProps> = ({ sessionId, config, hasGameStarted }) => {

    const handleDelete = (userId: string): void => {
        removePlayer(sessionId, userId);
    }

    const renderList = (): JSX.Element[] => {
        return config.players?.map((player, key) => {
            return (
                <ListItem 
                    key={key}
                >
                    <ListItemText>{player.alias}</ListItemText>
                    {
                        !hasGameStarted
                        ? <ListItemSecondaryAction>
                            <IconButton 
                                edge="end" 
                                aria-label="delete" 
                                onClick={(() => { handleDelete(player.userId); })}
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