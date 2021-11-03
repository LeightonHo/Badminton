import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../redux/General";
import axios from "axios";
import MatchHistory from "./MatchHistory";
import { RootState } from "../redux/Store";
import { setMatchHistory } from "../redux/Profile";

interface Prop {
    userId: string
}

const Profile: React.FC<Prop> = ({ userId }) => {
    const dispatch = useDispatch();
    const { matchHistory } = useSelector((state: RootState) => state.profile);
    const [isLoadingMatchHistory, setIsLoadingMatchHistory] = useState(false);

    useEffect(() => {
        // TODO: Fetch the user.
        console.log(userId)

        // if (!matchHistory || !matchHistory.length) {
        //     getPlayerHistory();
        // }
    }, [matchHistory]);

    const getPlayerHistory = () => {
        console.log("Fetching match history...");
        setIsLoadingMatchHistory(true);

        axios.get<any>(`${process.env.REACT_APP_API_URL}/user/match-history?userId=${userId}`).then(({ data }) => {
            dispatch(setMatchHistory(JSON.parse(data.payload)));
            setIsLoadingMatchHistory(false);
        });
    }

    const handleLogoutClick = () => {
        localStorage.removeItem("crosscourt_user");
        dispatch(setIsLoggedIn(false));
    }

    return (
        <>
            <Card className="card">
                <CardContent>
                    <Typography
                        variant="h5"
                        gutterBottom
                        className="config-card-header"
                    >
                        Profile
                    </Typography>

                    <TextField 
                        id="txtName" 
                        label="Name" 
                        variant="outlined" 
                        size="small"
                        type="text"
                        // value={user.name} 
                        name="name"
                        disabled
                        style={{
                            marginBottom: "15px",
                            width: "100%"
                        }}
                    />

                    <TextField 
                        id="inputAlias" 
                        label="Alias" 
                        variant="outlined" 
                        size="small"
                        type="text" 
                        name="alias"
                        // value={user.alias}
                        disabled
                        style={{
                            width: "100%"
                        }}
                    />
                </CardContent>
            </Card>

            <MatchHistory matchHistory={matchHistory} isLoading={isLoadingMatchHistory} />

            <Box className="config-buttons">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogoutClick}
                >
                    Log Out
                </Button>
            </Box>
        </>
    );
}

export default Profile;