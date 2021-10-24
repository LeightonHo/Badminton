import { createSlice } from '@reduxjs/toolkit'
import { IGameState } from "../types";

const initialState: IGameState = {
	rounds: []
}

export const configSlice = createSlice({
	name: "gameState",
	initialState,
	reducers: {
		addRound: (state, round) => {
			state.rounds = [...state.rounds, round.payload];
		},
        syncGameState: (state, gameState) => {
            state.rounds = gameState.payload;
        }
	},
})

export const { 
	addRound,
    syncGameState
} = configSlice.actions;

export default configSlice.reducer;