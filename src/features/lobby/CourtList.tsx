import { List, ListItem, ListItemSecondaryAction, ListItemText, IconButton } from "@material-ui/core";
import { removeCourt } from "../../helpers/Socket";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

const CourtList = () => {
    const { sessionId, isHost, isSessionActive } = useSelector((state: RootState) => state.general);
    const { courts } = useSelector((state: RootState) => state.config);

    const handleDelete = (court: string): void => {
        removeCourt(sessionId, court);
    }

    const renderList = (): JSX.Element[] => {
        return courts.map((court, key) => {
            return (
                <ListItem 
                    key={key}
                    style={{
                        backgroundColor: key % 2 ? "#fafafa" : "#f1f1f1"
                    }}
                >
                    <ListItemText>{court}</ListItemText>
                    <ListItemSecondaryAction>
                        {
                            isHost && isSessionActive
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
        <List>
            {renderList()}
        </List>
    );
}

export default CourtList;