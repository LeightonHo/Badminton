import { Box } from "@material-ui/core";
import React from "react";
import Bye from "./Bye";
import { IState as Props} from "./Main";

interface IProps {
    players: Props["config"]["players"]
    roundKey: number
}

const ByeContainer: React.FC<IProps> = ({ players, roundKey }) => {

    return (
        <Box className="divBye">
            {players.map((player, key) => {
                return (
                    <Bye 
                        key={key}
                        byeKey={key}
                        player={player.alias} 
                        roundKey={roundKey}
                    />
                )
            })}
        </Box>
    );
}

export default ByeContainer;