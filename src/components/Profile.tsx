import { Card, CardContent, Typography } from "@material-ui/core";
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
        <Card className="card">
            <CardContent>
                <Typography
                    variant="h5"
                    gutterBottom
                    className="config-card-header"
                >
                    Profile
                </Typography>
                <pre>
                    {JSON.stringify(user)}
                </pre>
            </CardContent>
        </Card>
    );
}

export default Profile;