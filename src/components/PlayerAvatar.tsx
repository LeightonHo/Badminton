import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router";

interface Props {
    id?: string | undefined,
    name?: string,
    src: string | undefined,
    style?: any
}

const PlayerAvatar: React.FC<Props> = ({ id, name, src, style }) => {
    const history = useHistory();
    const clickable = id && (id !== name) && name !== "Deleted User";

    const handleClick = () => {
        // If this is not a guest, then open their profile.
        if (clickable) {
            history.push(`profile?userId=${id}`)
        }
    }

    return (
        <Avatar
            src={src}
            alt={name}
            style={{ 
                cursor: clickable ? "pointer" : "auto",
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