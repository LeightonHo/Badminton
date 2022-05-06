import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
    data: {}
}

export const configSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
        setProfileData: (state, action) => {
            state.data = JSON.parse(action.payload);
        }
	},
})

export const { 
    setProfileData
} = configSlice.actions;

export default configSlice.reducer;