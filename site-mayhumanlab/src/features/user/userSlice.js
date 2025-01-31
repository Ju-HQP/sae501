import {
    createSlice
} from '@reduxjs/toolkit';
import {
    getAuth,
    login,
    logout,
} from './connexion';
import {
    redirectToProfile
} from 'react-router-dom';
import {
    updatePicture,
    updateProfile,
    resetPassword,
    sendMail
} from './userAsyncAction';

const slice = createSlice({
    name: 'user',
    initialState: {
        connected: false,
        isConnecting: false,
        userInfos: null,
        datasSend:{},
        isAdmin: false,
        redirectToProfile: false,
        imageEdit: false,
        loading: false,
        resetMessage: null,
        sendMailMessage: null,
        errors: {
            apiErrorLogin: null,
            apiErrorLogout: null,
            apiErrorUpdate: null,
            apiErrorUpdateImage: null
        },
    },
    reducers: {
        startConnecting(state, action) {
            state.isConnecting = true;
        },
        stopConnecting(state, action) {
            state.isConnecting = false;
        },
        startImageEdit(state, action){
            state.imageEdit = true;
        },
        stopImageEdit(state, action){
            state.imageEdit = false;
            state.redirectToProfile = true;
        },
        stopRedirect(state, action){
            state.redirectToProfile = false;
        },
        stopUserEdit(state){
            state.datasSend = {};
            state.errors.apiErrorUpdate = null;
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
                state.redirectToProfileToAgenda = true;
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
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.userInfos = action.payload;
                state.redirectToProfile = true;
                state.loading = false;
            })
            .addCase(updateProfile.pending, (state, action) => {
                state.loading = true;
                state.datasSend = {};
                state.errors.apiErrorUpdate = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.datasSend = action.payload.dataSend;
                state.errors.apiErrorUpdate = action.payload.message;
                state.loading = false;
            })
            .addCase(updatePicture.fulfilled, (state, action) => {
                state.userInfos = action.payload;
                state.imageEdit = false;
                state.redirectToProfile = true;
                state.loading = false;
                state.errors.apiErrorUpdateImage = null;
            })
            .addCase(updatePicture.pending, (state, action) => {
                state.loading = true;
                state.errors.apiErrorUpdateImage = null;
            })
            .addCase(updatePicture.rejected, (state, action) => {
                state.loading = false;
                state.errors.apiErrorUpdateImage = action.payload;
            })
    }
})

export const {
    startConnecting,
    stopConnecting,
    startImageEdit,
    stopImageEdit,
    stopRedirect,
    stopUserEdit,
} = slice.actions;
export default slice.reducer;