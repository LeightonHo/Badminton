import { Box, Typography } from "@material-ui/core";
import React from "react";
import { IState as Props} from "./Main";

interface IProps {
    players: Props["config"]["players"]
}

const Bye: React.FC<IProps> = ({ players }) => {

    return (
        <Box 
            className="divBye"
        >
            {players.map((player, i) => {
                return (
                    <Box key={i}>
                        <Typography
                            variant="overline"
                            align="center"
                        >
                            {player.name}
                        </Typography>
                    </Box>
                )
            })}
        </Box>
    );
}

export default Bye;