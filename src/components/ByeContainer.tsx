import { Box } from "@material-ui/core";
import React from "react";
import Bye from "./Bye";
import { IState as Props} from "./Main";

interface IProps {
    players: Props["config"]["players"]
    roundKey: number,
    sessionId: string,
    isHost: boolean,
    isConnected: boolean
}

const ByeContainer: React.FC<IProps> = ({ players, roundKey, sessionId, isHost, isConnected }) => {

    return (
        <Box className="divBye">
            {players.map((player, key) => {
                return (
                    <Bye 
                        key={key}
                        byeKey={key}
                        player={player.alias} 
                        roundKey={roundKey}
                        sessionId={sessionId}
                        isHost={isHost}
                        isConnected={isConnected}
                    />
                )
            })}
        </Box>
    );
}

export default ByeContainer;