import {
    createAsyncThunk
} from '@reduxjs/toolkit';
import {
    URL_API_FORGOT,
    URL_API_PASSWORD,
} from '../../utils/config.js';

//fonctions asynchrones pour communiquer avec l'api

export const sendMail = createAsyncThunk(
    'user/sendMail',
    async (datas, {
        rejectWithValue
    }) => {
        try {
            console.log(datas);
            const res = await fetch(URL_API_FORGOT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(datas)
            });
            return await res.json();
        } catch (er) {
            return rejectWithValue("Erreur lors de l'envoi du mail, veuillez réessayer plus tard.");
        }
    });

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async (password, {
        rejectWithValue
    }) => {
        try {
            const res = await fetch(URL_API_PASSWORD, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(password),
                credentials: "include"
            });
            const datas = res.json();
            if (res.status === 400) {
                throw new Error(datas.message);
                // va dans le cache
            }
            return datas;
        } catch (error) {
            return rejectWithValue(error.message ?? "Désolé, la réinitialisation du mot de passe a rencontré une erreur. Veuillez réessayer.");
        }
    }
)