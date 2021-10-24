import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import CourtForm from "./CourtForm";
import CourtList from "./CourtList";
import PlayerForm from "./PlayerForm";
import PlayerList from "./PlayerList";
import { useHistory } from "react-router-dom";
import { generateRound } from "../helpers/Socket";
import { confirmAlert } from "react-confirm-alert";
import { IPlayer } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { setIsLoading } from "../redux/General";

interface IProps {
    sessionId: string
}

const Configuration:React.FC<IProps> = ({ sessionId }) => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const { isHost } = useSelector((state: RootState) => state.general);
    const { players, courts } = useSelector((state: RootState) => state.config);
    const { rounds } = useSelector((state: RootState) => state.gameState);
    const hasGameStarted: boolean = rounds.length > 0;
    
    const getInactivePlayers = (): IPlayer[] => {
        let result: IPlayer[] = [];

        for (const player of players) {
            if (!player.active) {
                result.push(player);
            }
        }

        return result;
    }

    const handleGenerateRound = () => {
        // If there are inactive players, ask for confirmation
        const inactivePlayers = getInactivePlayers();

        if (inactivePlayers.length > 0) {
            const inactivePlayerAliases = inactivePlayers.map(element => element.alias);

            confirmAlert({
                title: "Confirm",
                message: `Are you sure you want to generate a round without the following players? ${inactivePlayerAliases.join(", ")}`,
                buttons: [
                    {
                        label: "Yes",
                        onClick: () => {
                            dispatch(setIsLoading(true));
                            generateRound(sessionId, {
                                courts: courts,
                                players: players
                            });

                            // TODO: Move this to the socket listener?
                            history.push("/round-robin");
                        }
                    },
                    {
                        label: "No",
                        onClick: () => { }
                    }
                ]
            });
        } else {
            dispatch(setIsLoading(true));
            generateRound(sessionId, {
                courts: courts,
                players: players
            });

            // TODO: Move this to the socket listener?
            history.push("/round-robin");
        }
    }

    const disableGenerateRoundButton = (): boolean => {
        const inactivePlayers = getInactivePlayers();
        const numberOfPlayers = players.length - inactivePlayers.length;
        const numberOfCourts = courts.length;
        const numberOfPlayersOnBye = numberOfPlayers - (courts.length * 4);

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

    const handleExport = (): void => {
        const data = `data:text/json;charsett=utf-8,${encodeURIComponent(JSON.stringify(rounds))}`;
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
                            Courts ({courts.length})
                        </Typography>
                        {
                            isHost
                            ? <CourtForm sessionId={sessionId} />
                            : ""
                        }
                        <CourtList 
                            sessionId={sessionId} 
                            isHost={isHost} 
                        />
                    </CardContent>
                </Card>

                <Card className="card players-card">
                    <CardContent>
                        <Typography
                            variant="h5"
                            gutterBottom
                            className="config-card-header"
                        >
                            Players ({players.length - getInactivePlayers().length})
                        </Typography>
                        {
                            isHost
                            ? <PlayerForm sessionId={sessionId} />
                            : ""
                        }
                        <PlayerList sessionId={sessionId} />
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
                                disabled={disableGenerateRoundButton()}
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