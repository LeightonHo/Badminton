import { Box } from "@mui/system";

interface Props {
    data: any
}

const MatchHistoryItem:React.FC<Props> = ({ data }) => {
    return (
        <Box style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around"
        }}>
            <p>{data.startTime}</p>
            <p>{data.sessionArchiveId}</p>
            <p>{data.win}</p>
            <p>{data.loss}</p>
        </Box>
    );
}

export default MatchHistoryItem;