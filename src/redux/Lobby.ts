import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
    error: ""
}

export const configSlice = createSlice({
	name: "lobby",
	initialState,
	reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        }
	},
})

export const { 
    setError
} = configSlice.actions;

export default configSlice.reducer;