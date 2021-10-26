import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import Bye from "./Bye";
import { IState as Props} from "./Main";

interface IProps {
    players: Props["config"]["players"]
    roundKey: number
}

const ByeContainer: React.FC<IProps> = ({ players, roundKey }) => {
    const { isMobileView } = useSelector((state: RootState) => state.general);

    const renderByes = () => {
        return (players.map((player, key) => {
            return (
                <Bye 
                    key={key}
                    byeKey={key}
                    player={player} 
                    roundKey={roundKey}
                />
            )
        }));
    }

    return (
        <Box style={{
            display: "flex",
            flexDirection: isMobileView ? "column" : "row",
            justifyContent: "space-evenly"
        }}>
            {renderByes()}
        </Box>
    );
}

export default ByeContainer;