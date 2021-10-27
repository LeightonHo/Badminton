import { Box, Button, Card, CardContent, TextField, Typography } from "@material-ui/core";
import React from "react";
import { IUser } from "../types";

interface Prop {
    user: IUser
}

const Profile: React.FC<Prop> = ({ user }) => {

    const getPlayerHistory = () => {
        // TODO: Create new endpoint for fetching match history by userId.
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
                        className="text-input" 
                        label="Name" 
                        variant="outlined" 
                        size="small"
                        type="text"
                        value={user.name} 
                        name="Name"
                        disabled
                    />

                    <TextField 
                        id="inputAlias" 
                        className="text-input" 
                        label="Alias" 
                        variant="outlined" 
                        size="small"
                        type="text" 
                        name="court"
                    />

                    <pre>
                        {JSON.stringify(user)}
                    </pre>
                </CardContent>
            </Card>

            <Box className="config-buttons">
                <Button
                    variant="contained"
                    color="secondary"
                >
                    Logout
                </Button>
            </Box>
        </>
    );
}

export default Profile;