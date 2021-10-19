import { Box, Card, CardContent, LinearProgress, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IUser } from "../types";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import axios from "axios";
import Image from "../static/login_background.jpg";

interface Props {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    setUser: React.Dispatch<React.SetStateAction<IUser>>,
}

const Login: React.FC<Props> = ({ setIsLoggedIn, setUser }) => {

    const devMode = true;
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    // useEffect(() => {
    //     if (devMode) {
    //         setIsLoggedIn(true);
    //     }
    // }, []);

    const responseFacebook = (response: ReactFacebookLoginInfo) => {
        console.log(response);

        if (response.accessToken) {
            // Check or create login.
            const payload = {
                facebookUserId: response.userID,
                name: response.name,
                email: response.email,
                avatarUrl: response.picture?.data.url,
            };

            axios.post<any>("https://n4x7vjzngg.execute-api.ap-southeast-2.amazonaws.com/production", payload).then(
                ({ data }) => {
                    const userData = JSON.parse(data.body);

                    if (data.statusCode === 200) {
                        setIsLoggingIn(false);
                        setIsLoggedIn(true);
                        setUser({
                            userId: userData.UserId,
                            email: userData.Email,
                            name: userData.Name,
                            avatarUrl: userData.AvatarUrl
                        });
                    } else {
                        setIsLoggedIn(false);
                    }
                }
            );
        }
    }

    const handleFacebookClick = () => {
        setIsLoggingIn(true);
    }

    const styles = {
        paperContainer: {
            height: "100vh",
            width: "100%",
            backgroundImage: `url(${Image})`,
            backgroundSize: "contain",
            filter: "brightness(85%)"
        },
        subtitle: {
            "margin-bottom": "20px"
        }
    }

    return (
        <Box>
            <Box style={styles.paperContainer} />
            <Card className="card login">
                {
                    isLoggingIn
                    ? <LinearProgress color="primary" />
                    : ""
                }
                <CardContent>
                    <Typography
                        variant="h4"
                        gutterBottom
                    >
                        Login
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        gutterBottom
                    >
                        Welcome to Sunday Badminton
                    </Typography>

                    <Box>
                        <FacebookLogin
                            appId="190285126563993"
                            autoLoad={true}
                            fields="name,email,picture"
                            scope="public_profile"
                            callback={responseFacebook}
                            icon="fa-facebook"
                            isDisabled={isLoggingIn}
                            onClick={handleFacebookClick}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Login;