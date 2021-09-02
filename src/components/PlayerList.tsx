import React from "react";
import {IState as Props} from "../App";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Box, Grid, ListItemText } from "@material-ui/core";

interface IProps {
    players: Props["players"]
}

const PlayerList: React.FC<IProps> = ({ players }) => {

    const renderList = (): JSX.Element[] => {
        return players.map((player) => {
            return (
                <ListItem key={player.name}>
                    <ListItemText>{player.name} ({player.win}-{player.loss})</ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon /> 
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        })
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
    )
}

export default PlayerList;