import { Button, Backdrop, Card, CardContent, Typography } from "@material-ui/core";
import { useState } from "react";
import { initSocket } from "../helpers/Socket";

const Disconnected = () => {
    const [isReconnecting, setIsReconnecting] = useState(false);

    const reconnect = () => {
        console.log("Reconnecting...");
        setIsReconnecting(true);
        initSocket();
    }

    return (
        <>
            <Backdrop
                style={{ 
                    opacity: "50%",
                    color: "#fff", 
                    zIndex: 10
                }}
                open={true}
            />
            <Card style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
                width: "300px",
                zIndex: 50,
                opacity: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <CardContent>
                    <Typography
                        variant="overline"
                        style={{
                            fontSize: "16px",
                            textAlign: "center"
                        }}
                    >
                        {
                            isReconnecting
                            ? "Reconnecting..."
                            : "Disconnected"
                        }
                    </Typography>
                </CardContent>
                <Button
                    variant="contained"
                    color="primary"                 
                    onClick={reconnect}
                    style={{
                        marginBottom: "15px"
                    }}
                    disabled={isReconnecting ? true : false}
                >
                    Reconnect
                </Button>
            </Card>
        </>
    );
}

export default Disconnected;