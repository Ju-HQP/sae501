import {
    createAsyncThunk
} from '@reduxjs/toolkit';
import {
    URL_API_USER,
    URL_API_FORGOT,
    URL_API_PASSWORD,
    URL_API_VOLUNTEERS,
} from '../../utils/config.js';

export const updateProfile = createAsyncThunk(
    'benevoles/updateProfile',
    async (datas, {
        rejectWithValue
    }) => {
        try {
            const response = await fetch(`${URL_API_USER}/${datas.id_benevole}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(datas),
            });
            if (response.status === 403) {
                throw new Error("Désolé, vous n'avez pas les autorisations requises pour effectuer cette action.");
            }
            if (response.status === 409 || response.status === 400) { // Conflit avec les autres données // Mauvaise requête
                const error = await response.json();
                throw new Error(error.message);
            }
            return await response.json();
        } catch (error) {
            // création de l'objet errorObj pour transmettre les données écrites précédemment
            const errorObj = {
                message: error.message ?? "Désolé, la mise à jour du bénévole a rencontré une erreur.",
                dataSend: datas
            }
            return rejectWithValue(errorObj);
        };
    }
)

export const updatePicture = createAsyncThunk(
    'benevoles/updatePicture',
    async (datas, {
        rejectWithValue
    }) => {
        try {
            const response = await fetch(`${URL_API_USER}/image`, {
                method: 'POST',
                credentials: 'include',
                body: datas,
            });
            if (response.status === 403) {
                throw new Error("Désolé, vous n'avez pas les autorisations requises pour effectuer cette action.");
            }
            if (response.status === 400) { // Conflit ou pas d'image
                const error = await response.json();
                throw new Error(error.message);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        };
    }
)

//fonctions asynchrones pour communiquer avec l'api

export const sendMail = createAsyncThunk(
    'user/sendMail',
    async (datas, {
        rejectWithValue
    }) => {
        try {
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