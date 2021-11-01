import { Box } from "@mui/system";
import moment from "moment";

interface Props {
    index: number,
    data: any
}

const MatchHistoryItem:React.FC<Props> = ({ index, data }) => {
    const WEEKS_IN_THREE_MONTHS = 12;

    const timeAgo = (datetime: string): string => {
        const duration = moment.duration(moment.utc().diff(datetime));
        const durationAsHours = Math.round(duration.asHours());
        const durationAsDays = Math.round(duration.asDays());
        const durationAsWeeks = Math.round(duration.asWeeks());
        const durationAsMonths = Math.round(duration.asMonths());

        if (durationAsHours < 24) {
            // x hour(s) ago
            if (durationAsHours === 1) {
                return "an hour ago";
            }
            else {
                return `${durationAsHours} hours ago`;
            }
        } else if (durationAsDays < 7) {
            // x days ago
            if (durationAsDays === 1) {
                return "a day ago";
            } else {
                return `${durationAsDays} days ago`;
            }
        } else if (durationAsWeeks < WEEKS_IN_THREE_MONTHS) {
            // x weeks ago
            if (durationAsWeeks === 1) {
                return "a week ago";
            } else {
                return `${durationAsWeeks} weeks ago`;
            }
        } else {
            return `${durationAsMonths} months ago`;
        }
    }

    return (
        <Box style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: index % 2 === 0 ? "#f1f1f1" : "#fafafa"
        }}>
            <Box>
                {/* <p>{moment(data.startTime).format("DD/MM")}</p> */}
                <p>{timeAgo(data.startTime)}</p>
            </Box>
            <Box style={{
                display: "flex",
                flexDirection: "column"
            }}>
                <Box>
                    {/* <p style={{ fontSize: "10px" }}>{data.sessionArchiveId}</p> */}
                </Box>
                <Box>
                    <p>{data.win}/{data.loss}</p>
                </Box>
            </Box>
        </Box>
    );
}

export default MatchHistoryItem;