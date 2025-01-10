import {
    createSlice
} from '@reduxjs/toolkit';
import {
    login,
    logout,
} from './connexion';

const slice = createSlice({
    name: 'user',
    initialState: {
        connected: false,
        isConnecting: false,
        userId:null,
        isAdmin: false,
        errors: {
            apiErrorLogin: null,
            apiErrorLogout: null,
        },
    },
    reducers: {
        startConnecting(state, action) {
            state.isConnecting = true;
        },
        stopConnecting(state, action) {
            state.isConnecting = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.errors.apiErrorLogin = null;
                // voir après pour fonction de chargement (s'inspirer création bénévole)
                //state.isLogging = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.connected = true;
                state.isConnecting = false;
                state.errors.apiErrorLogin = null;
                                // state.isLogging = false;
                state.userId = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                // state.isLogging = false;
                state.errors.apiErrorLogin = action.payload;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.connected = false;
                state.isAdmin = false;
                state.userId = null;
                state.errors.apiErrorLogout = null;
            })
            .addCase(logout.pending, (state, action) => {
                state.errors.apiErrorLogout = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.errors.apiErrorLogout = action.payload;
            })
            // A compléter pour la page profil (modif)
    }
})

export const {
    startConnecting,
    stopConnecting
} = slice.actions;
export default slice.reducer;