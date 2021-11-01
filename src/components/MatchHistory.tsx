import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import MatchHistoryItem from "./MatchHistoryItem";

interface Props {
    matchHistory: any[],
    isLoading: boolean
}

const MatchHistory:React.FC<Props> = ({ matchHistory, isLoading }) => {
    const { isMobile } = useSelector((state: RootState) => state.general);

    return (
        <Card 
            className="card"
            style={{
                maxHeight: isMobile ? "400px" : "100%"
            }}
        >
            <CardContent>
                <Typography
                    variant="h5"
                    gutterBottom
                    className="config-card-header"
                >
                    History
                </Typography>

                {
                    isLoading
                    ? "Loading..."
                    : <Box style={{
                        height: "330px",
                        overflowY: "scroll"
                    }}>
                        {
                            [...matchHistory].reverse().map((matchHistoryItem, key) => {
                                return (
                                    <MatchHistoryItem 
                                        key={key}
                                        index={key}
                                        data={matchHistoryItem}
                                    />
                                )
                            })
                        }
                    </Box>
                }
                
            </CardContent>
        </Card>
    );
}

export default MatchHistory;