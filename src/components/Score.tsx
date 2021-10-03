import { Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { pushMatchScore } from "../functions/SocketHelper";

interface IProps {
    team: number,
    score: number,
    roundKey: number,
    matchKey: number,
    socket: WebSocket,
    sessionId: string
}

const Score: React.FC<IProps> = ({ team, score, roundKey, matchKey, socket, sessionId }) => {
    
    const [inputScore, setInputScore] = useState<number>(score);

    useEffect(() => {
        setInputScore(score);
    }, [score]);

    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let updatedValue = parseInt(e.target.value);

        if (isNaN(updatedValue) || updatedValue < 0) {
            updatedValue = 0;
        }

        console.log("setting ", updatedValue)

        setInputScore(updatedValue);
    }

    const pushScoreChange = () => {
        console.log(inputScore)
        pushMatchScore(socket, sessionId, roundKey, matchKey, team, inputScore);
    }

    const showScore = (score: number): string => {
        if (isNaN(score) || score === 0) {
            return "";
        }

        return score.toString();
    }

    return (
        <Grid item xs className="score-input-grid-item">
            <TextField
                variant="outlined"
                type="number"
                onChange={handleScoreChange}
                onBlur={pushScoreChange}
                name="team1Score"
                value={showScore(inputScore)}
                size="small"
                className="score-input"
            />
        </Grid>
    );
}

export default Score;