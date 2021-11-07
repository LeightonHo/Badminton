import { Box, Button, Card, CardContent, LinearProgress, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../redux/General";
import axios from "axios";
import MatchHistory from "./MatchHistory";
import { RootState } from "../redux/Store";
import { setProfileData } from "../redux/Profile";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { userId } = useSelector((state: RootState) => state.general);
    const { data } = useSelector((state: RootState) => state.profile);
    const { search } = useLocation();
    const profileUserId = queryString.parse(search).userId;

    useEffect(() => {
        getPlayerProfile(profileUserId);
    }, []);

    const getPlayerProfile = (userId: any) => {
        setIsLoading(true);

        axios.get<any>(`${process.env.REACT_APP_API_URL}/user?userId=${userId}`).then(({ data }) => {
            dispatch(setProfileData(data.payload));
            setIsLoading(false);
        });
    }

    const handleLogoutClick = () => {
        localStorage.removeItem("crosscourt_user");
        history.push("/login");
        dispatch(setIsLoggedIn(false));
    }

    return (
        <>
            {
                isLoading
                ? <LinearProgress />
                : ""
            }

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
                        value={data.Name || ""} 
                        name="name"
                        disabled
                        fullWidth
                        style={{
                            marginBottom: "15px"
                        }}
                    />

                    <TextField 
                        id="inputAlias" 
                        label="Alias" 
                        variant="outlined" 
                        size="small"
                        type="text" 
                        name="alias"
                        value={data.Alias || ""}
                        fullWidth
                        disabled
                        // style={{
                        //     marginBottom: "15px"
                        // }}
                    />

                    {/* <TextField
                        id="inputBio"
                        label="Bio"
                        variant="outlined"
                        size="small"
                        type="text"
                        name="bio"
                        multiline
                        fullWidth
                    >

                    </TextField> */}
                </CardContent>
            </Card>

            <Card 
                className="card"
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        gutterBottom
                        className="config-card-header"
                    >
                        History
                    </Typography>
                    <MatchHistory matchHistory={data.MatchHistory || []} />
                </CardContent>
            </Card>

            {
                userId === profileUserId
                ? <Box className="config-buttons">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogoutClick}
                    >
                        Log Out
                    </Button>
                </Box>
                : ""
            }
        </>
    );
}

export default Profile;