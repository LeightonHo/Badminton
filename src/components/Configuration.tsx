import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import CourtForm from "./CourtForm";
import CourtList from "./CourtList";
import PlayerForm from "./PlayerForm";
import PlayerList from "./PlayerList";
import { IState as Props } from "./Main";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router-dom";
import { generateRound } from "../helpers/Socket";

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

    const handleGenerateRound = () => {
        generateRound(sessionId);

        // TODO: Move this to the socket listener?
        history.push("/round-robin");
    }

    const disableGenerateRoundButtton = () => {
        const numberOfPlayers = config.players.length;
        const numberOfCourts = config.courts.length;
        const numberOfPlayersOnBye = config.players.length - (config.courts.length * 4);

        if (numberOfPlayers == 0) {
            return true;
        }

        if (numberOfCourts == 0) {
            return true;
        }

        if (numberOfPlayers - (numberOfCourts * 4) < 0) {
            return true;
        }

        if (numberOfPlayersOnBye > 3) {
            return true;
        }

        return false;
    }

    const handleExport = () => {
        const data = `data:text/json;charsett=utf-8,${encodeURIComponent(JSON.stringify(gameState))}`;
        let downloadAnchorElement = document.getElementById("downloadAnchorElement");

        downloadAnchorElement?.setAttribute("href", data);
        downloadAnchorElement?.setAttribute("download", `badminton-export-${new Date().toISOString().split("T")[0]}.json`);
        downloadAnchorElement?.click();
    }

    const renderConfiguration = () => {
        return (
            <>
                <Card className="card courts-card">
                    <CardContent>
                        <Typography
                            variant="h5"
                            gutterBottom
                        >
                            Courts ({config.courts.length})
                        </Typography>
                        {
                            isHost // && !hasGameStarted
                            ? <CourtForm sessionId={sessionId} config={config} />
                            : ""
                        }
                        <CourtList sessionId={sessionId} config={config} hasGameStarted={hasGameStarted} />
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
                            isHost
                            ? <PlayerForm sessionId={sessionId} config={config} />
                            : ""
                        }
                        <PlayerList 
                            sessionId={sessionId}
                            config={config} 
                            setConfig={setConfig} 
                            hasGameStarted={hasGameStarted} />
                    </CardContent>
                </Card>

                <Box className="config-buttons">
                    {
                        isHost
                        ? <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleGenerateRound}
                                disabled={disableGenerateRoundButtton()}
                            >
                                Generate Round
                            </Button>
                        </>
                        : ""
                    }
                    {
                        hasGameStarted && false
                        ? <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleExport}
                            >
                                Export Data
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