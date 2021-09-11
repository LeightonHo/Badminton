import { Box } from "@material-ui/core";
// import { React } from "react";
import CourtForm from "./CourtForm";
import CourtList from "./CourtList";
import PlayerForm from "./PlayerForm";
import PlayerList from "./PlayerList";
import {IState as Props} from "./Main";

interface IProps {
    courts: Props["courts"],
    players: Props["players"],
    setCourts: React.Dispatch<React.SetStateAction<Props["courts"]>>,
    setPlayers: React.Dispatch<React.SetStateAction<Props["players"]>>
}

const Configuration:React.FC<IProps> = ({ courts, players, setCourts, setPlayers }) => {
    return (
        <Box>
            <Box>
                <h1>Games ({courts.length})</h1>
                
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