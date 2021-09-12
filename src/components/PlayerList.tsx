import React from "react";
import {IState as Props} from "./Main";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, ListItemText } from "@material-ui/core";

interface IProps {
    config: Props["config"],
    setConfig: React.Dispatch<React.SetStateAction<Props["config"]>>
}

const PlayerList: React.FC<IProps> = ({ config, setConfig }) => {

    const handleDelete = (index: number): void => {
        config.players.splice(index, 1);

        setConfig({
            ...config,
            players: [
                ...config.players
            ]
        });
    }

    const renderList = (): JSX.Element[] => {
        return config.players.map((player, i) => {
            return (
                <ListItem key={i}>
                    {/* <ListItemText>{player.name} ({player.win}-{player.loss})</ListItemText> */}
                    {formatPlayerInfo(i, player.name, player.win, player.loss)}
                    <ListItemSecondaryAction>
                        <IconButton 
                            edge="end" 
                            aria-label="delete" 
                            onClick={(() => { handleDelete(i); })}
                        >
                            <DeleteIcon /> 
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        });
    }

    const formatPlayerInfo = (index: number, name: string, win: number, loss: number) => {
        let trophy = "";

        if (index === 0) {
            trophy = "🥇 ";
        }

        if (index === 1) {
            trophy = "🥈 ";
        }

        if (index === 2) {
            trophy = "🥉 ";  
        }

        return (
            <ListItemText>{trophy}{name} ({win}-{loss})</ListItemText>
        )
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

export default PlayerList;