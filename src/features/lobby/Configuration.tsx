import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import CourtForm from "./CourtForm";
import CourtList from "./CourtList";
import PlayerForm from "./PlayerForm";
import PlayerList from "./PlayerList";
import { useHistory } from "react-router-dom";
import { generateRound } from "../../helpers/Socket";
import { confirmAlert } from "react-confirm-alert";
import { IPlayer } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { setIsLoading, setNavigation } from "../../redux/General";

const Configuration = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { sessionId, isHost, isSessionActive } = useSelector((state: RootState) => state.general);
    const { players, courts } = useSelector((state: RootState) => state.config);
    const { rounds } = useSelector((state: RootState) => state.gameState);

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
                message: `The following players will not be playing: ${inactivePlayerAliases.join(", ")}`,
                buttons: [
                    {
                        label: "Ok",
                        onClick: () => {
                            dispatch(setIsLoading(true));
                            generateRound(sessionId, {
                                courts: courts,
                                players: players
                            });

                            // TODO: Move this to the socket listener?
                            history.push("/games");
                            window.scrollTo({ top: 0 });
                            dispatch(setNavigation("games"))
                        }
                    },
                    {
                        label: "Cancel",
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
            history.push("/games");
            window.scrollTo({ top: 0 });
            dispatch(setNavigation("games"))
        }
    }

    const disableGenerateRoundButton = (): boolean => {
        const inactivePlayers = getInactivePlayers();
        const numberOfPlayers = players.length - inactivePlayers.length;
        const numberOfCourts = courts.length;
        const numberOfPlayersOnBye = numberOfPlayers - (courts.length * 4);

        if (numberOfPlayers === 0) {
            return true;
        }

        if (numberOfCourts === 0) {
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
                        isHost && isSessionActive
                        ? <CourtForm />
                        : ""
                    }
                    <CourtList />
                </CardContent>
            </Card>

            <Card className="card players-card">
                <CardContent>
                    <Typography
                        variant="h5"
                        gutterBottom
                    >
                        Players ({players.length - getInactivePlayers().length})
                    </Typography>
                    {
                        isHost && isSessionActive
                        ? <PlayerForm />
                        : ""
                    }
                    <PlayerList />
                </CardContent>
            </Card>

            <Box className="config-buttons">
                {
                    isHost && isSessionActive
                    ? <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleGenerateRound}
                            disabled={disableGenerateRoundButton()}
                            fullWidth
                        >
                            Generate Round
                        </Button>
                    </>
                    : ""
                }
                {
                    !isSessionActive
                    ? <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleExport}
                            fullWidth
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

export default Configuration;