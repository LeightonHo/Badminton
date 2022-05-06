import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
    user: JSON.parse(localStorage.getItem("crosscourt_user") || "{}"),
    userId: "",
    sessionId: JSON.parse(localStorage.getItem("crosscourt_user") || "{}").currentSessionId || "",
    isLoggedIn: !!localStorage.getItem("crosscourt_user"),
	isGuest: true,
	isHost: false,
    isConnected: false,
    isLoading: false,
    isJoiningSession: false,
    joinedSession: false,
    isMobile: false,
    isSessionActive: true,
    navigation: "",
    filterView: localStorage.getItem("crosscourt_filter_view") || "detailed"
}

export const configSlice = createSlice({
	name: "general",
	initialState,
	reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setIsGuest: (state, action) => {
			state.isGuest = action.payload;
		},
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
        setIsMobile: (state, action) => {
			state.isMobile = action.payload;
		},
        setNavigation: (state, action) => {
            state.navigation = action.payload;
        },
        setIsSessionActive: (state, action) => {
            state.isSessionActive = action.payload;
        },
        setFilterView: (state, action) => {
            state.filterView = action.payload;
            localStorage.setItem("crosscourt_filter_view", action.payload);
        }
	},
})

export const { 
    setUser,
    setUserId,
    setSessionId,
    setIsLoggedIn,
	setIsGuest,
	setIsHost,
    setIsConnected,
    setIsLoading,
    setJoinedSession,
    setIsMobile,
    setNavigation,
    setIsSessionActive,
    setFilterView
} = configSlice.actions;

export default configSlice.reducer;