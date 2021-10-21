import React from "react";
import { IState as Props } from "./Main";
import { List, ListItem, ListItemSecondaryAction, ListItemText, IconButton } from "@material-ui/core";
import { removeCourt } from "../helpers/Socket";
import DeleteIcon from '@material-ui/icons/Delete';

interface IProps {
    sessionId: string,
    config: Props["config"],
    isHost: boolean
}

const CourtList: React.FC<IProps> = ({ sessionId, config, isHost }) => {

    const handleDelete = (court: string): void => {
        removeCourt(sessionId, court);
    }

    const renderList = (): JSX.Element[] => {
        return config.courts.map((court, i) => {
            return (
                <ListItem key={i}>
                    <ListItemText>{court}</ListItemText>
                    <ListItemSecondaryAction>
                        {
                            isHost
                            ? <IconButton 
                                edge="end" 
                                aria-label="delete"
                                onClick={() => { handleDelete(court); }}
                            >
                                <DeleteIcon /> 
                            </IconButton>
                            : ""
                        }
                    </ListItemSecondaryAction>
                </ListItem>
            )
        });
    }

    return (
        <List className="player-list-grid">
            {renderList()}
        </List>
    );
}

export default CourtList;