import { Box } from "@mui/system";
import moment from "moment";

interface Props {
    index: number,
    data: any
}

const MatchHistoryItem:React.FC<Props> = ({ index, data }) => {
    const WEEKS_IN_THREE_MONTHS = 12;
    const SECONDS_IN_ONE_HOUR = 3600;

    console.log(data);

    const calculateSessionDuration = (start: number, end: number) => {
        const duration = moment.duration(end - start, "milliseconds").asMilliseconds();
        const hours = moment.utc(duration).format("H");
        const minutes = moment.utc(duration).format("m");

        return `${hours}h ${minutes}m`;
    }

    const calculateSessionDurationText = (start: number, end: number) => {
        const durationAsMinutes = Math.round((end - start) / 1000 / 60);
        const durationAsHours = Math.round(durationAsMinutes / 60);

        if (durationAsMinutes < 60) {
            return `${durationAsMinutes} minute${durationAsMinutes === 1 ? "" : "s"}`;
        } else {
            return `${durationAsHours} hour${durationAsHours === 1 ? "" : "s"}`;
        }
    }

    const getRelativeSessionStart = (datetime: string): string => {
        const duration = moment.duration(moment.utc().diff(datetime));
        const durationAsHours = Math.round(duration.asHours());
        const durationAsDays = Math.round(duration.asDays());
        const durationAsWeeks = Math.round(duration.asWeeks());
        const durationAsMonths = Math.round(duration.asMonths());

        if (durationAsHours < 24) {
            // x hour(s) ago
            if (durationAsHours === 0) {
                return "just now";
            } else if (durationAsHours === 1) {
                return "an hour ago";
            } else {
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
            justifyContent: "space-between",
            padding: "5px 15px 5px 15px",
            backgroundColor: index % 2 === 0 ? "#f1f1f1" : "#fafafa",
            textAlign: "center"
        }}>
            <Box style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center"
            }}>
                <span>{moment(data.start).format("ddd Do MMM")}</span>
                <span style={{
                    fontSize: "12px"
                }}>{getRelativeSessionStart(data.start)}</span>
            </Box>
            <Box style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}>
                <span>{data.rounds} rounds</span>
                <span style={{
                    fontSize: "12px"
                }}>{calculateSessionDuration(data.start, data.end)}</span>
            </Box>
            <Box style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}>
                {/* <span>W : L</span> */}
                <span style={{
                    fontStyle: "bold"
                }}>{data.win} / {data.loss}</span>
            </Box>
        </Box>
    );
}

export default MatchHistoryItem;