import {
    createSlice
} from '@reduxjs/toolkit';
import {
    getAuth,
    login,
    logout,
} from './connexion';
import {
    resetPassword,
    sendMail
} from './userAsyncAction';

const slice = createSlice({
    name: 'user',
    initialState: {
        connected: false,
        isConnecting: false,
        userInfos: null,
        isAdmin: false,
        resetMessage: null,
        sendMailMessage: null,
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
                state.userInfos = action.payload.utilisateur;
            })
            .addCase(login.rejected, (state, action) => {
                // state.isLogging = false;
                state.errors.apiErrorLogin = action.payload;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.connected = false;
                state.isAdmin = false;
                state.userInfos = null;
                state.errors.apiErrorLogout = null;
            })
            .addCase(logout.pending, (state, action) => {
                state.errors.apiErrorLogout = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.errors.apiErrorLogout = action.payload;
            })
            // Fonction pour palier le reload de la page qui reset les states
            .addCase(getAuth.fulfilled, (state, action) => {
                state.connected = true;
                state.userInfos = action.payload.utilisateur;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resetMessage = action.payload.message;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resetMessage = null;
            })
            .addCase(sendMail.fulfilled, (state, action) => {
                state.sendMailMessage = action.payload.message;
            })
            .addCase(sendMail.rejected, (state, action) => {
                state.sendMailMessage = action.payload;
            })
    }
})

export const {
    startConnecting,
    stopConnecting
} = slice.actions;
export default slice.reducer;