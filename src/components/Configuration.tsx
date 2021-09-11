import { Box, TextField } from "@material-ui/core";
import CourtForm from "./CourtForm";
import CourtList from "./CourtList";
import PlayerForm from "./PlayerForm";
import PlayerList from "./PlayerList";
import { IState as Props } from "./Main";
import { useState } from "react";

interface IProps {
    config: Props["config"],
    setConfig: React.Dispatch<React.SetStateAction<Props["config"]>>
}

const Configuration:React.FC<IProps> = ({ config, setConfig }) => {

    const [rounds, setRounds] = useState<Props["rounds"]>(config.rounds);
    const [courts, setCourts] = useState<Props["courts"]>(config.courts);
    const [players, setPlayers] = useState<Props["players"]>(config.players);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!isNaN(parseInt(e.target.value))) {
            setRounds(parseInt(e.target.value));
        }
    }

    return (
        <Box>
            <Box>
                <h1>Rounds ({rounds})</h1>
                <TextField 
                    id="inputMatches" 
                    label="Rounds" 
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
                <CourtForm config={config} setConfig={setConfig} />
                <CourtList config={config} setConfig={setConfig} />
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