import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import CourtForm from "./CourtForm";
import CourtList from "./CourtList";
import PlayerForm from "./PlayerForm";
import PlayerList from "./PlayerList";
import { IState as Props } from "./Main";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router-dom";
import { generateRoundRobin } from "../helpers/RoundRobinGenerator";
import { pushGameState } from "../helpers/SocketHelper";

export interface IConfig {
    rounds: number,
    winningScore: number,
    courts: string[],
    players: string[]
}

interface IProps {
    config: Props["config"],
    setConfig: React.Dispatch<React.SetStateAction<Props["config"]>>,
    gameState: Props["gameState"],
    socket: Props["socket"],
    sessionId: string
}

const Configuration:React.FC<IProps> = ({ config, setConfig, gameState, socket, sessionId }) => {
    const history = useHistory();
    
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
                            rounds: 15,
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
            message: "Generating a new round robin will clear existing game data.  Are you sure you want to continue?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        const roundRobin = generateRoundRobin(config);
                        pushGameState(socket, sessionId, config, roundRobin);
                        history.push("/round-robin");
                    }
                },
                {
                    label: "No",
                    onClick: () => { }
                }
            ]
        });
    }

    const handleExport = () => {
        const data = `data:text/json;charsett=utf-8,${encodeURIComponent(JSON.stringify(gameState))}`;
        let downloadAnchorElement = document.getElementById("downloadAnchorElement");

        downloadAnchorElement?.setAttribute("href", data);
        downloadAnchorElement?.setAttribute("download", `badminton-export-${new Date().toISOString().split("T")[0]}.json`);
        downloadAnchorElement?.click();
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
                    <Typography
                        variant="subtitle2"
                    >
                        The session code is <b>{sessionId}</b>
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
                    onClick={clearGameData}
                >
                    Generate round robin
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleExport}
                >
                    Export data
                </Button>
                <a id="downloadAnchorElement"></a>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={clearConfigData}
                >
                    Reset config
                </Button>
            </Box>
        </Box>
    );
}

export default Configuration;