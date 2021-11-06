import { IconButton, TableCell, TableRow } from "@material-ui/core";
import { Box } from "@mui/system";
import moment from "moment";
import { useState } from "react";
import MatchHistoryRowDetail from "./MatchHistoryRowDetail";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface Props {
    index: number,
    data: any
}

const MatchHistoryRow: React.FC<Props> = ({ index, data }) => {
    const WEEKS_IN_THREE_MONTHS = 12;
    const [showDetail, setShowDetail] = useState<boolean>(false);

    const calculateSessionDuration = (start: number, end: number) => {
        const duration = moment.duration(end - start, "milliseconds").asMilliseconds();
        const hours = moment.utc(duration).format("H");
        const minutes = moment.utc(duration).format("m");

        if (parseInt(hours) > 0) {
            return `${hours}h ${minutes}m`;
        }

        return `${minutes}m`;
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
    
    const handleRowClick = () => {
        setShowDetail(!showDetail);
    }

    return (
        <>
            <TableRow 
                key={index}
                style={{
                    cursor: "pointer",
                    backgroundColor: index % 2 ? "#fafafa" : "#f1f1f1"
                }}
            >
                <TableCell width={1}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={handleRowClick}
                    >
                        {showDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <Box>{moment(data.start).format("ddd DD/MM")}</Box>
                    <Box style={{
                        fontSize: "12px"
                    }}>{getRelativeSessionStart(data.start)}</Box>
                </TableCell>
                <TableCell style={{
                    textAlign: "center"
                }}>
                    <Box>
                        {data.rounds} <span>({calculateSessionDuration(data.start, data.end)})</span>
                    </Box>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                    <Box style={{
                        fontStyle: "bold"
                    }}>{data.win} - {data.loss}</Box>
                </TableCell>
            </TableRow>

            {
                showDetail
                ? <MatchHistoryRowDetail sessionArchiveId={data.sessionArchiveId} />
                : ""
            }
        </>
    );
}

export default MatchHistoryRow;