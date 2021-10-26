import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { IPlayer } from "../types";
import Bye from "./Bye";

interface IProps {
    players: IPlayer[],
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
            flexDirection: "column",
            justifyContent: "space-evenly"
        }}>
            {renderByes()}
        </Box>
    );
}

export default ByeContainer;