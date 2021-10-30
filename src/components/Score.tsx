import { Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateScore } from "../helpers/Socket";
import { RootState } from "../redux/Store";

interface IProps {
    team: number,
    score: number,
    roundKey: number,
    matchKey: number
}

const Score: React.FC<IProps> = ({ team, score, roundKey, matchKey }) => {
    const { sessionId, isConnected, isSessionActive } = useSelector((state: RootState) => state.general);
    const [inputScore, setInputScore] = useState<number>(score);

    useEffect(() => {
        setInputScore(score);
    }, [score, isConnected]);

    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let updatedValue = parseInt(e.target.value);

        if (isNaN(updatedValue) || updatedValue < 0) {
            updatedValue = 0;
        }

        setInputScore(updatedValue);
    }

    const pushScoreChange = () => {
        if (!isConnected || !inputScore) {
            return;
        }

        updateScore(sessionId, roundKey, matchKey, team, inputScore);
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
                disabled={!isConnected || !isSessionActive}
            />
        </Grid>
    );
}

export default Score;