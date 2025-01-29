import {
    createSlice
} from '@reduxjs/toolkit';
import {
    getAuth,
    login,
    logout,
} from './connexion';
import {
    redirect
} from 'react-router-dom';
import {
    updatePicture,
    updateProfile
} from './userAsyncAction';

const slice = createSlice({
    name: 'user',
    initialState: {
        connected: false,
        isConnecting: false,
        userInfos: null,
        isAdmin: false,
        redirect: false,
        imageEdit: false,
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
        },
        startImageEdit(state, action){
            state.imageEdit = true;
        },
        stopImageEdit(state, action){
            state.imageEdit = false;
        },
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
                state.redirectToAgenda = true;
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
            // A compléter pour la page profil (modif)
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.userInfos = action.payload;
                state.redirect = true;
            })
            .addCase(updateProfile.pending, (state, action) => {
                
            })
            .addCase(updatePicture.fulfilled, (state, action) => {
                state.userInfos = action.payload;
                state.imageEdit = false;
            })
            .addCase(updatePicture.pending, (state, action) => {

            })
    }
})

export const {
    startConnecting,
    stopConnecting,
    startImageEdit,
    stopImageEdit
} = slice.actions;
export default slice.reducer;