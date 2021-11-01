import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
    matchHistory: []
}

export const configSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
        setMatchHistory: (state, action) => {
            state.matchHistory = action.payload;
        }
	},
})

export const { 
    setMatchHistory
} = configSlice.actions;

export default configSlice.reducer;