import { Box, LinearProgress, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { IUser } from "../types";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../redux/General";

interface Props {
    setUser: React.Dispatch<React.SetStateAction<IUser>>
}

const Login: React.FC<Props> = ({ setUser }) => {
    const dispatch = useDispatch();
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    const responseFacebook = (response: ReactFacebookLoginInfo) => {
        if (response.accessToken) {
            // Check or create login.
            const payload = {
                facebookUserId: response.userID,
                name: response.name,
                alias: getDefaultAlias(response.name),
                email: response.email,
                avatarUrl: response.picture?.data.url,
            };

            axios.post<any>(`${process.env.REACT_APP_API_URL}/login`, payload).then(({ data }) => {
                setIsLoggingIn(false);
                const userData = JSON.parse(data.body);

                if (data.statusCode === 200) {
                    setIsLoggingIn(false);
                    dispatch(setIsLoggedIn(true));

                    const user = {
                        userId: userData.UserId,
                        email: userData.Email,
                        name: userData.Name,
                        alias: getDefaultAlias(userData.Name),
                        avatarUrl: userData.AvatarUrl,
                        currentSessionId: userData.CurrentSessionId,
                        isGuest: false
                    }

                    setUser(user);
                    localStorage.setItem("crosscourt_user", JSON.stringify(user));
                } else {
                    dispatch(setIsLoggedIn(false));
                }
            });
        }
    }

    const getDefaultAlias = (name: any): string => {
        const indexOfSpace = name?.indexOf(" ");

        if (indexOfSpace === -1) {
            return name;
        }

        return name.substring(0, indexOfSpace);
    }

    const handleFacebookClick = () => {
        setIsLoggingIn(true);
    }

    // const handleGuestClick = () => {
    //     setIsLoggingIn(true);
    //     setUser({
    //         userId: crypto.randomBytes(16).toString("hex"),
    //         email: "",
    //         name: "Guest ",
    //         avatarUrl: "",
    //         currentSessionId: "",
    //         isGuest: true
    //     });
    //     setIsLoggedIn(true);
    // }

    const styles = {
        paperContainer: {
            height: "100vh",
            width: "100%",
            backgroundImage: `url(${Image})`,
            backgroundSize: "contain",
            filter: "brightness(50%)"
        },
        subtitle: {
            "margin-bottom": "20px"
        }
    }

    return (
        <Box className="login-screen">
            {/* <Box style={styles.paperContainer} /> */}
            <Paper className="login-card">
                <Box className="login-header">
                    <Typography variant="h5">
                        Cross Court
                    </Typography>
                    <Typography variant="subtitle2">
                        Welcome! Please sign in.
                    </Typography>
                </Box>
                {
                    isLoggingIn
                        ? <LinearProgress
                            className="login-progress"
                            // classes={{
                            //     colorPrimary: classes.colorPrimary,
                            //     bar: classes.bar
                            // }}
                        />
                        : ""
                }
                <Box className="login-body">
                    <FacebookLogin
                        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                        textButton="Continue with Facebook"
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="public_profile"
                        callback={responseFacebook}
                        icon="fa-facebook"
                        isDisabled={isLoggingIn}
                        onClick={handleFacebookClick}
                        isMobile={false}
                    />
                </Box>

                <Box
                    className="login-footer" 
                    // onClick={handleGuestClick}
                >
                    {/* <Typography 
                        className="login-guest-button"
                        variant="overline"
                    >
                        Continue as guest
                    </Typography> */}
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;