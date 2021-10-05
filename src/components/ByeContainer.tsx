import { Box } from "@material-ui/core";
import React from "react";
import Bye from "./Bye";
import { IState as Props} from "./Main";

interface IProps {
    players: Props["config"]["players"]
    roundKey: number,
    sessionId: string,
    isConnected: boolean
}

const ByeContainer: React.FC<IProps> = ({ players, roundKey, sessionId, isConnected }) => {

    return (
        <Box className="divBye">
            {players.map((player, key) => {
                return (
                    <Bye 
                        key={key}
                        byeKey={key}
                        player={player} 
                        roundKey={roundKey}
                        sessionId={sessionId}
                        isConnected={isConnected}
                    />
                )
            })}
        </Box>
    );
}

export default ByeContainer;