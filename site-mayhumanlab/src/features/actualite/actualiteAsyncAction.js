import {
    createAsyncThunk
} from '@reduxjs/toolkit';
import {
    URL_API_ACTUS
} from '../../utils/config';

//fonctions asynchrones pour communiquer avec l'api

export const loadActus = createAsyncThunk(
    'actualites/loadActus',
    async (_, {
        rejectWithValue
    }) => {
        try {
            const response = await fetch(URL_API_ACTUS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue("Les actualités sont indisponibles.");
        }
    }
)

export const addActu = createAsyncThunk(
    'actualites/addActu',
    async (dataToSend, {
        rejectWithValue
    }) => {
        try {
            const response = await fetch(URL_API_ACTUS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            });
            return await response.json();
        } catch (error) {
            return rejectWithValue("Erreur lors de l'ajout de l'actualité.");
        }
    }
)

export const updateActu = createAsyncThunk(
    'actualites/updateActu',
    async (dataToSend, {rejectWithValue}) => {
        try {
            const response = await fetch(`${URL_API_ACTUS}/${dataToSend.id_actualite}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            return await response.json();
        } catch (error) {
            return rejectWithValue("Erreur lors de la modification de l'actualité.");
        }
    }
)

export const saveActu = createAsyncThunk(
    'actualites/saveActu',
    async (dataToSend, {dispatch,getState}) => {
        try {
            if (getState().actualite.idActu) {
                dispatch(updateActu(dataToSend));
            } else {
                dispatch(addActu(dataToSend));
            }
        } catch (er) {
            throw new Error(er);
        }
    }
)

export const deleteActu = createAsyncThunk(
    'actualites/deleteActu',
    async (dataToSend, {rejectWithValue}) => {
        try {
            const response = await fetch(`${URL_API_ACTUS}/${dataToSend.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return dataToSend.id;
        } catch (error) {
            return rejectWithValue("Erreur lors de la suppression de l'actualité.");
        }
    }
)