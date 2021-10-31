import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../redux/General";
import { IUser } from "../types";
import axios from "axios";
import MatchHistory from "./MatchHistory";

interface Prop {
    user: IUser
}

const Profile: React.FC<Prop> = ({ user }) => {
    const dispatch = useDispatch();
    const [matchHistory, setMatchHistory] = useState();
    const [isLoadingMatchHistory, setIsLoadingMatchHistory] = useState(false);

    useEffect(() => {
        getPlayerHistory();
    }, []);

    const getPlayerHistory = () => {
        setIsLoadingMatchHistory(true);

        axios.get<any>(`https://n4x7vjzngg.execute-api.ap-southeast-2.amazonaws.com/production/user/match-history?userId=${user.userId}`).then(({ data }) => {
            setMatchHistory(JSON.parse(data.payload));
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
                        value={user.name} 
                        name="Name"
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
                        name="court"
                        value={user.alias}
                        disabled
                        style={{
                            width: "100%"
                        }}
                    />
                </CardContent>
            </Card>

            {/* <MatchHistory matchHistory={matchHistory || []} isLoading={isLoadingMatchHistory} /> */}

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