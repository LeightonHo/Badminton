import React from "react";
import { IState as Props } from "./Main";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItemText } from "@material-ui/core";

interface IProps {
    config: Props["config"],
    setConfig: React.Dispatch<React.SetStateAction<Props["config"]>>,
    hasGameStarted: boolean
}

const CourtList: React.FC<IProps> = ({ config, setConfig, hasGameStarted }) => {

    const handleDelete = (index: number): void => {
        config.courts.splice(index, 1);

        setConfig({
            ...config,
            courts: [
                ...config.courts
            ]
        });
    }

    const renderList = (): JSX.Element[] => {
        return config.courts.map((court, i) => {
            return (
                <ListItem key={i}>
                    <ListItemText>{court}</ListItemText>
                    {
                        !hasGameStarted
                        ? <ListItemSecondaryAction>
                            <IconButton 
                                edge="end" 
                                aria-label="delete"
                                onClick={() => { handleDelete(i); }}
                            >
                                <DeleteIcon /> 
                            </IconButton>
                        </ListItemSecondaryAction>
                        : ""
                    }
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