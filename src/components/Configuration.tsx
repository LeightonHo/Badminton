import { Box, TextField } from "@material-ui/core";
import CourtForm from "./CourtForm";
import CourtList from "./CourtList";
import PlayerForm from "./PlayerForm";
import PlayerList from "./PlayerList";
import { IState as Props } from "./Main";

export interface IConfig {
    rounds: number,
    courts: string[],
    players: {
      name: string,
      win: number,
      loss: number
    }[]
}

interface IProps {
    config: Props["config"],
    setConfig: React.Dispatch<React.SetStateAction<Props["config"]>>
}

const Configuration:React.FC<IProps> = ({ config, setConfig }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!isNaN(parseInt(e.target.value))) {
            setConfig({
                ...config,
                rounds: parseInt(e.target.value)
            });
        }
    }

    return (
        <Box>
            <Box>
                <h1>Rounds ({config.rounds})</h1>
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
                <h1>Courts ({config.courts.length})</h1>
                <CourtForm config={config} setConfig={setConfig} />
                <CourtList config={config} setConfig={setConfig} />
            </Box>

            <Box>
                <h1>Players ({config.players.length})</h1>
                <PlayerForm config={config} setConfig={setConfig} />
                <PlayerList config={config} setConfig={setConfig} />
            </Box>
        </Box>
    );
}

export default Configuration;