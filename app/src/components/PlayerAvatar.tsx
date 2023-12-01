import { Avatar } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router";

interface Props {
    id?: string | undefined,
    name?: string,
    src: string | undefined,
    style?: React.CSSProperties
}

const PlayerAvatar: React.FC<Props> = ({ id, name, src, style }) => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState<boolean>(false);
    const clickable = id && (id !== name) && name !== "Deleted User";

    const handleClick = () => {
        // If this is not a guest, then open their profile.
        if (clickable) {
            navigate(`profile?userId=${id}`)
        }
    }

    const handleOnLoad = () => {
        // Show the default avatar until the image loads from the server.
        setLoaded(true);
    }

    return (
        <>
            <Avatar
                src={src}
                alt={name}
                style={{ 
                    display: loaded ? "" : "none",
                    cursor: clickable ? "pointer" : "auto",
                    margin: "auto",
                    ...style
                }}
                onClick={handleClick}
                onLoad={handleOnLoad}
            >
                { name ? name[0] : ""}
            </Avatar>
            <Avatar
                alt={name}
                style={{ 
                    display: loaded ? "none" : "",
                    cursor: clickable ? "pointer" : "auto",
                    margin: "auto",
                    ...style
                }}
                onClick={handleClick}
            >
                { name ? name[0] : ""}
            </Avatar>
        </>
    );
}

export default PlayerAvatar;