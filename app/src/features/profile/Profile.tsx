import { Box, Button, Card, CardContent, LinearProgress, TextField, Typography } from "@material-ui/core";
import MatchHistory from "./MatchHistory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../redux/Store";
import { 
    setIsLoggedIn,
    setIsLoading as reduxSetIsLoading, 
    setUser,
    setToken
} from "../../redux/General";
import { setProfileData } from "../../redux/Profile";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import PlayerAvatar from "../../components/PlayerAvatar";

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
    }, [profileUserId]);

    const getPlayerProfile = (userId: any) => {
        setIsLoading(true);

        axios.get<any>(`${process.env.REACT_APP_API_URL}/user?userId=${userId}`).then(({ data }) => {
            if (data.statusCode === 200) {
                dispatch(setProfileData(data.payload));
            }

            setIsLoading(false);
        });
    }

    const filterMatchHistory = (matchHistory: []) => {
        if (matchHistory !== null && typeof(matchHistory) === 'object' && matchHistory.length > 10) {
            return matchHistory.slice(-10);
        }
        
        return matchHistory;
    }

    const handleLogoutClick = () => {
        localStorage.removeItem("crosscourt_user");
        localStorage.removeItem("crosscourt_token");

        dispatch(setUser(null));
        dispatch(setIsLoggedIn(false));
        dispatch(setToken(""));
        dispatch(reduxSetIsLoading(false));

        history.push("/login");
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
                    <Box style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10
                    }}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            className="config-card-header"
                        >
                            Profile
                        </Typography>
                        <PlayerAvatar
                            name={data.Alias}
                            src={data.AvatarUrl}
                            style={{
                                margin: 0
                            }}
                        />
                    </Box>
                    
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
                        label="Nickname" 
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
                        className="config-card-header"
                    >
                        History
                    </Typography>

                    {
                        data.MatchHistory !== null && typeof(data.MatchHistory) === 'object' && data.MatchHistory.length > 10
                        ? <Typography gutterBottom style={{
                            fontSize: "0.9rem"
                        }}>
                            Showing the last {filterMatchHistory(data.MatchHistory).length} matches.
                        </Typography>
                        : ""
                    }
                    
                    <MatchHistory matchHistory={filterMatchHistory(data.MatchHistory) || []} />
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