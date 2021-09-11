import { Box, TextField } from "@material-ui/core";
// import { React } from "react";
import CourtForm from "./CourtForm";
import CourtList from "./CourtList";
import PlayerForm from "./PlayerForm";
import PlayerList from "./PlayerList";
import {IState as Props} from "./Main";

interface IProps {
    matches: Props["matches"],
    courts: Props["courts"],
    players: Props["players"],
    setMatches: React.Dispatch<React.SetStateAction<Props["matches"]>>,
    setCourts: React.Dispatch<React.SetStateAction<Props["courts"]>>,
    setPlayers: React.Dispatch<React.SetStateAction<Props["players"]>>
}

const Configuration:React.FC<IProps> = ({ matches, courts, players, setMatches, setCourts, setPlayers }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!isNaN(parseInt(e.target.value))) {
            setMatches(parseInt(e.target.value));
        }
    }

    return (
        <Box>
            <Box>
                <h1>Matches ({matches})</h1>
                <TextField 
                    id="inputMatches" 
                    label="Matches" 
                    type="number"
                    variant="outlined" 
                    size="small"
                    fullWidth
                    onChange={handleChange}
                    name="name"
                />
            </Box>

            <Box>
                <h1>Courts ({courts.length})</h1>
                <CourtForm courts={courts} setCourts={setCourts} />
                <CourtList courts={courts} setCourts={setCourts} />
            </Box>

            <Box>
                <h1>Players ({players.length})</h1>
                <PlayerForm players={players} setPlayers={setPlayers} />
                <PlayerList players={players} setPlayers={setPlayers} />
            </Box>
        </Box>
    );
}

export default Configuration;