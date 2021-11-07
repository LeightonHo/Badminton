import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router";

interface Props {
    id: string | undefined,
    name?: string,
    src: string | undefined,
    style?: any
}

const PlayerAvatar: React.FC<Props> = ({ id, name, src, style }) => {
    const history = useHistory();
    const isGuest = id === name;

    const handleClick = () => {
        // If this is not a guest, then open their profile.
        if (!isGuest) {
            history.push(`profile?userId=${id}`)
        }
    }

    return (
        <Avatar
            src={src}
            alt={name}
            style={{ 
                cursor: isGuest ? "auto" : "pointer",
                margin: "auto",
                ...style
            }}
            onClick={handleClick}
        >
            { name ? name[0] : ""}
        </Avatar>
    )
}

export default PlayerAvatar;