import {
    createAsyncThunk
} from '@reduxjs/toolkit';
import {
    URL_API_VOLUNTEERS
} from '../../utils/config.js';

//fonctions asynchrones pour communiquer avec l'api

export const loadVolunteer = createAsyncThunk(
    'benevoles/loadVolunteer',
    async (_, {
        rejectWithValue
    }) => {
        // if(checkAuthStatus){
        try {
            const response = await fetch(URL_API_VOLUNTEERS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' // important pour conserver le cookie de session
            });
            if (response.redirected) {
                return rejectWithValue("Vous n'êtes pas connecté");
            }
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue("L'application est actuellement indisponible. Veuillez réessayer ultérieurement");
        };
    }
)

export const saveVolunteer = createAsyncThunk(
    'benevoles/saveVolunteer',
    async (datas, {
        dispatch,
        getState
    }) => {
        if (getState().volunteer.idVolunteerModifying) {
            dispatch(updateVolunteer(datas));
        } else {
            dispatch(addVolunteer(datas));
        }
    }
)

export const addVolunteer = createAsyncThunk(
    'benevoles/addVolunteer',
    async (datas, {
        getState,
        rejectWithValue
    }) => {
        try {
            const res = await fetch(URL_API_VOLUNTEERS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // important pour conserver le cookie de session
                body: JSON.stringify(datas)
            });
            if (res.status === 403) {
                throw new Error("Désolé, vous n'avez pas les autorisations requises pour effectuer cette action.");
            }
            if (res.status === 409) { // Conflit avec les autres données
                const error = await res.json();
                throw new Error(error.message);
            }
            return await res.json();
        } catch (error) {
            // création de l'objet errorObj pour transmettre les données écrites précédemment
            const errorObj = {
                message: error.message ?? "Désolé, l'ajout du bénévole a rencontré une erreur.",
                dataSend: datas
            }
            return rejectWithValue(errorObj);
        }
    }
)

export const updateVolunteer = createAsyncThunk(
    'benevoles/updateVolunteer',
    async (datas, {
        rejectWithValue
    }) => {
        try {
            const response = await fetch(`${URL_API_VOLUNTEERS}/${datas.id_benevole}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(datas),
            });
            if (response.status === 403) {
                return rejectWithValue("Désolé, vous n'avez pas les autorisations requises pour effectuer cette action.");
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

export const deleteVolunteer = createAsyncThunk(
    'benevoles/deleteVolunteer',
    async (datas, {
        rejectWithValue
    }) => {
        try {
            const response = await fetch(`${URL_API_VOLUNTEERS}/${datas.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.status === 403) {
                return rejectWithValue("Désolé, vous n'avez pas les autorisations requises pour effectuer cette action.");
            }
            if (response.status === 204) {
                return datas.id;
            }
        } catch (error) {
            return rejectWithValue(error.response.data.error.message);
        };
    }
)