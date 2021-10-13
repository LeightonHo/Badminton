import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import CourtForm from "./CourtForm";
import CourtList from "./CourtList";
import PlayerForm from "./PlayerForm";
import PlayerList from "./PlayerList";
import { IState as Props } from "./Main";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router-dom";
import { generateRoundRobin } from "../helpers/RoundRobinGenerator";
import { pushGameState } from "../helpers/Socket";

interface IProps {
    config: Props["config"],
    setConfig: React.Dispatch<React.SetStateAction<Props["config"]>>,
    gameState: Props["gameState"],
    sessionId: string,
    isHost: boolean
}

const Configuration:React.FC<IProps> = ({ config, setConfig, gameState, sessionId, isHost }) => {
    
    const history = useHistory();
    const hasGameStarted: boolean = gameState.length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!isNaN(parseInt(e.target.value))) {
            setConfig({
                ...config,
                rounds: parseInt(e.target.value)
            });
        }
    }

    const handleStartClick = () => {
        const numberOfPlayers = config.players.length;
        const numberOfCourts = config.courts.length;

        if (numberOfPlayers == 0) {
            console.log(`Please enter at least four players per court.`);
            return;
        }

        if (numberOfCourts == 0) {
            console.log(`Please enter at least one court.`);
            return;
        }

        if (numberOfPlayers - (numberOfCourts * 4) < 0) {
            console.log(`There are not enough players for ${numberOfCourts} courts.`);
            return;
        }

        const roundRobin = generateRoundRobin(config);
        pushGameState(sessionId, config, roundRobin);
        history.push("/round-robin");
    }

    const handleExport = () => {
        const data = `data:text/json;charsett=utf-8,${encodeURIComponent(JSON.stringify(gameState))}`;
        let downloadAnchorElement = document.getElementById("downloadAnchorElement");

        downloadAnchorElement?.setAttribute("href", data);
        downloadAnchorElement?.setAttribute("download", `badminton-export-${new Date().toISOString().split("T")[0]}.json`);
        downloadAnchorElement?.click();
    }

    const disableInput = () => {
        return !(isHost && !hasGameStarted);
    }

    const renderConfiguration = () => {
        return (
            <>
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
                            disabled={disableInput()}
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
                            disabled={disableInput()}
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
                        {
                            isHost && !hasGameStarted
                            ? <CourtForm config={config} setConfig={setConfig} />
                            : ""
                        }
                        <CourtList config={config} setConfig={setConfig} hasGameStarted={hasGameStarted} />
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
                        {
                            isHost && !hasGameStarted
                            ? <PlayerForm config={config} setConfig={setConfig} />
                            : ""
                        }
                        <PlayerList config={config} setConfig={setConfig} hasGameStarted={hasGameStarted} />
                    </CardContent>
                </Card>

                <Box className="config-buttons">
                    {
                        !hasGameStarted && isHost
                        ? <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleStartClick}
                                disabled={hasGameStarted}
                            >
                                Start Session
                            </Button>
                        </>
                        : ""
                    }
                    {
                        hasGameStarted
                        ? <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleExport}
                            >
                                Export data
                            </Button>
                            <a id="downloadAnchorElement"></a>
                        </>
                        : ""
                    }
                </Box>
            </>
        );
    }

    return (
        <>
            {renderConfiguration()}
        </>
    );
}

export default Configuration;