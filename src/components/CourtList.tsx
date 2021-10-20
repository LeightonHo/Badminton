import React from "react";
import { IState as Props } from "./Main";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItemText } from "@material-ui/core";
import { removeCourt } from "../helpers/Socket";

interface IProps {
    sessionId: string,
    config: Props["config"],
    hasGameStarted: boolean
}

const CourtList: React.FC<IProps> = ({ sessionId, config, hasGameStarted }) => {

    const handleDelete = (court: string): void => {
        removeCourt(sessionId, court);
    }

    const renderList = (): JSX.Element[] => {
        return config.courts?.map((court, i) => {
            return (
                <ListItem key={i}>
                    <ListItemText>{court}</ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton 
                            edge="end" 
                            aria-label="delete"
                            onClick={() => { handleDelete(court); }}
                        >
                            <DeleteIcon /> 
                        </IconButton>
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