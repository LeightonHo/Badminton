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
        let rows = [];

        for (let i = 0; i < rounds.length; i++) {
            let roundNumber = i + 1;
            let round = rounds[i];
            
            for (let j = 0; j < round.matches.length; j++) {
                let match = round.matches[j];

                rows.push([roundNumber, match.team1.player1.alias, match.team1.player2.alias, match.team1.score, match.team1.score > match.team2.score ? "W" : "L"]);
                rows.push([roundNumber, match.team2.player3.alias, match.team2.player4.alias, match.team2.score, match.team2.score > match.team1.score ? "W" : "L"]);
            }
        }
        
        const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
        let downloadAnchorElement = document.getElementById("downloadAnchorElement");

        downloadAnchorElement?.setAttribute("href", encodeURI(csvContent));
        downloadAnchorElement?.setAttribute("download", `badminton-export-${new Date().toISOString().split("T")[0]}.csv`);
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