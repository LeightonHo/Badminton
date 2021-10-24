import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
	isHost: false,
    isConnected: false,
    isLoading: false,
    isJoiningSession: false,
    joinedSession: false,
    sessionId: ""
}

export const configSlice = createSlice({
	name: "general",
	initialState,
	reducers: {
		setIsHost: (state, action) => {
			state.isHost = action.payload;
		},
        setIsConnected: (state, action) => {
			state.isConnected = action.payload;
		},
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
		},
        setJoinedSession: (state, action) => {
			state.joinedSession = action.payload;
		},
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
        }
	},
})

export const { 
	setIsHost,
    setIsConnected,
    setIsLoading,
    setJoinedSession,
    setSessionId
} = configSlice.actions;

export default configSlice.reducer;