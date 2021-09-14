import { Box, Card, CardContent, CardHeader, TextField, Typography } from "@material-ui/core";
import CourtForm from "./CourtForm";
import CourtList from "./CourtList";
import PlayerForm from "./PlayerForm";
import PlayerList from "./PlayerList";
import { IState as Props } from "./Main";

export interface IConfig {
    rounds: number,
    winningScore: number,
    courts: string[],
    players: string[]
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
            <Card className="card">
                <CardContent className="general-card">
                    <Typography
                        variant="h5"
                    >
                        General
                    </Typography>
                    <TextField 
                        id="inputMatches" 
                        label="Rounds" 
                        type="number"
                        variant="outlined" 
                        size="small"
                        fullWidth
                        onChange={handleChange}
                        placeholder={config.rounds.toString()}
                        name="name"
                        className="general-input"
                    />
                    <TextField 
                        id="inputWinningScore" 
                        label="Winning Score" 
                        type="number"
                        variant="outlined" 
                        size="small"
                        fullWidth
                        onChange={handleChange}
                        placeholder={config.winningScore.toString()}
                        name="name"
                        className="general-input"
                    />
                </CardContent>
            </Card>

            <Card className="card courts-card">
                <CardContent>
                    <Typography
                        variant="h5"
                        gutterBottom
                    >
                        Courts ({config.courts.length})
                    </Typography>
                    <CourtForm config={config} setConfig={setConfig} />
                    <CourtList config={config} setConfig={setConfig} />
                </CardContent>
            </Card>

            <Card className="card players-card">
                <CardContent>
                    <Typography
                        variant="h5"
                        gutterBottom
                        className="config-card-header"
                    >
                        Players ({config.players.length})
                    </Typography>
                    <PlayerForm config={config} setConfig={setConfig} />
                    <PlayerList config={config} setConfig={setConfig} />
                </CardContent>
            </Card>
        </Box>
    );
}

export default Configuration;