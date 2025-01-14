import {
    createAsyncThunk
} from '@reduxjs/toolkit';
import {
    URL_API_CSRF,
    URL_API_LOGIN
} from '../../utils/config.js';
import {
    URL_API_LOGOUT
} from '../../utils/config.js';
import { resetDatas } from '../volunteer/volunteerSlice.js';
//fonctions asynchrones pour communiquer avec l'api

// récupération du jeton de session pour la connexion
export const csrfToken = createAsyncThunk(
    'user/csrf',
    async (_, {
        rejectWithValue
    }) => {
        try {
            const reponse = await fetch(URL_API_CSRF, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const datas = await reponse.json();
            return datas.csrfToken;
        } catch (error) {
            return rejectWithValue(error.response.data.error.message);
        }
    }
)

export const login = createAsyncThunk(
    'user/login',
    async (datas, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const token = await dispatch(csrfToken());
            datas["_csrf_token"] = token.payload;
            console.log(datas);
            const res = await fetch(URL_API_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(datas)
            });
            return await res.json();
        } catch (er) {
            return rejectWithValue(+er.response.data.error.message);
        }
    });

export const logout = createAsyncThunk(
    'user/logout',
    async (_, {
         dispatch,rejectWithValue
    }) => {
        try {
            const res = await fetch(URL_API_LOGOUT, {
                method: 'POST',
                credentials: 'include',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify(datas)
            }); 
            // Réponse correspondant à la route logout_msg (requête POST vers logout, réponse avec le msg)
            if (res.ok) {
                dispatch(resetDatas()); // Réinitialiser les données utilisateur
                return { message: 'Déconnexion réussie' }; // Réponse simulée
            }
            // return await res.json();
        } catch (er) {
            return rejectWithValue(+er.response.data.error.message)
        }
    });