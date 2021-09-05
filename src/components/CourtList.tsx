import React from "react";
import {IState as Props} from "../App";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, ListItemText } from "@material-ui/core";

interface IProps {
    courts: Props["courts"],
    setCourts: React.Dispatch<React.SetStateAction<Props["courts"]>>
}

const CourtList: React.FC<IProps> = ({ courts, setCourts }) => {

    const handleDelete = (index: number): void => {
        courts.splice(index, 1);

        setCourts([
            ...courts
        ]);
    }

    const renderList = (): JSX.Element[] => {
        return courts.map((court, i) => {
            return (
                <ListItem key={i}>
                    <ListItemText>{court}</ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton 
                            edge="end" 
                            aria-label="delete"
                            onClick={() => { handleDelete(i); }}
                        >
                            <DeleteIcon /> 
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        });
    }

    return (
        <Grid
            className="player-list-grid"
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
        >
            <List className="player-list-grid-item">
                {renderList()}
            </List>
        </Grid>
    );
}

export default CourtList;