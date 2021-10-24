import React from "react";
import { List, ListItem, ListItemSecondaryAction, ListItemText, IconButton } from "@material-ui/core";
import { removeCourt } from "../helpers/Socket";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

interface IProps {
    sessionId: string,
    isHost: boolean
}

const CourtList: React.FC<IProps> = ({ sessionId, isHost }) => {
    const { courts } = useSelector((state: RootState) => state.config);

    const handleDelete = (court: string): void => {
        removeCourt(sessionId, court);
    }

    const renderList = (): JSX.Element[] => {
        return courts.map((court, i) => {
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