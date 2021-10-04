import { Box } from "@material-ui/core";
import React from "react";
import Bye from "./Bye";
import { IState as Props} from "./Main";

interface IProps {
    players: Props["config"]["players"]
    roundKey: number,
    socket: Props["socket"],
    sessionId: string
}

const ByeContainer: React.FC<IProps> = ({ players, roundKey, socket, sessionId }) => {

    return (
        <Box className="divBye">
            {players.map((player, key) => {
                return (
                    <Bye 
                        key={key}
                        byeKey={key}
                        player={player} 
                        roundKey={roundKey}
                        socket={socket}
                        sessionId={sessionId}
                    />
                )
            })}
        </Box>
    );
}

export default ByeContainer;