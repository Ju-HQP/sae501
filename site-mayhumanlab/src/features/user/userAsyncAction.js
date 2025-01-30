import {
    createAsyncThunk
} from '@reduxjs/toolkit';
import {
    URL_API_VOLUNTEERS
} from '../../utils/config.js';

export const updateProfile = createAsyncThunk(
    'benevoles/updateProfile',
    async (datas, {
        rejectWithValue
    }) => {
        try {
            console.log(datas);
            const response = await fetch(`${URL_API_VOLUNTEERS}/${datas.id_benevole}`, {
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
            if (response.status === 409) { // Conflit avec les autres données
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
            const response = await fetch(`${URL_API_VOLUNTEERS}/image`, {
                method: 'POST',
                credentials: 'include',
                body: datas,
            });
            if (response.status === 403) {
                throw new Error("Désolé, vous n'avez pas les autorisations requises pour effectuer cette action.");
            }
            if (response.status === 400) { // Conflit avec les autres données ou pas d'image
                const error = await response.json();
                throw new Error(error.message);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        };
    }
)