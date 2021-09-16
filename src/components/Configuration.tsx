import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import CourtForm from "./CourtForm";
import CourtList from "./CourtList";
import PlayerForm from "./PlayerForm";
import PlayerList from "./PlayerList";
import { IState as Props } from "./Main";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export interface IConfig {
    rounds: number,
    winningScore: number,
    courts: string[],
    players: string[]
}

interface IProps {
    config: Props["config"],
    setConfig: React.Dispatch<React.SetStateAction<Props["config"]>>,
    setGameData: React.Dispatch<React.SetStateAction<Props["gameData"]>>
}

const Configuration:React.FC<IProps> = ({ config, setConfig, setGameData }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!isNaN(parseInt(e.target.value))) {
            setConfig({
                ...config,
                rounds: parseInt(e.target.value)
            });
        }
    }

    const clearConfigData = () => {
        confirmAlert({
            title: "Confirm",
            message: "Are you sure you want to clear the local settings?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => { 
                        setConfig({
                            rounds: 0,
                            winningScore: 21,
                            courts: [],
                            players: []
                        });
                    }
                },
                {
                    label: "No",
                    onClick: () => { }
                }
            ]
        });
    }

    const clearGameData = () => {
        confirmAlert({
            title: "Confirm",
            message: "Are you sure you want to clear the local game data?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => { setGameData([]); }
                },
                {
                    label: "No",
                    onClick: () => { }
                }
            ]
        });
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
                        label={`Rounds (${config.rounds.toString()})`}
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
                        label={`Winning Score (${config.winningScore.toString()})`}
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

            <Box className="config-buttons">
                <Button 
                    variant="contained" 
                    color="primary"
                >
                    Export
                </Button>

                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={clearConfigData}
                >
                    Clear config
                </Button>

                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={clearGameData}
                >
                    Clear data
                </Button>
            </Box>

        </Box>
    );
}

export default Configuration;