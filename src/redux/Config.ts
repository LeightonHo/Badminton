import { createSlice } from '@reduxjs/toolkit'
import { IConfig } from "../types";

const initialState: IConfig = {
	courts: [],
	players: []
}

export const configSlice = createSlice({
	name: "config",
	initialState,
	reducers: {
		addPlayer: (state, action) => {
			for (let i = 0; i < state.players.length; i++) {
				if (state.players[i].userId === action.payload.userId) {
					return;
				}
			}

			state.players = [...state.players, action.payload];
		},
		removePlayer: (state, action) => {
			for (let i = 0; i < state.players.length; i++) {
				if (state.players[i].userId === action.payload.userId) {
					state.players.splice(i, 1);
					break;
				}
			}
		},
		updatePlayer: (state, action) => {
			for (let i = 0; i < state.players.length; i++) {
				if (state.players[i].userId === action.payload.userId) {
					state.players[i] = action.payload;
					break;
				}
			}
		},
		addCourt: (state, action) => {
			state.courts = [...state.courts, action.payload];
		},
		removeCourt: (state, action) => {
			for (let i = 0; i < state.courts.length; i++) {
				if (state.courts[i] === action.payload) {
					state.courts.splice(i, 1);
					break;
				}
			}
		},
		setConfig: (state, action) => {
			state.courts = action.payload.courts;
			state.players = action.payload.players;
		}
	},
})

export const { 
	addPlayer, 
	removePlayer, 
	updatePlayer,
	addCourt,
	removeCourt,
	setConfig
} = configSlice.actions;

export default configSlice.reducer;