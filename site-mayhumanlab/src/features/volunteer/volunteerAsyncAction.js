import {
    createAsyncThunk
} from '@reduxjs/toolkit';
import {
    URL_API
} from '../../utils/config.js';

//fonctions asynchrones pourcommuniquer avec l'api

export const loadProjects = createAsyncThunk(
    'benevoles/loadProjects',
    async (_, { rejectWithValue }) => {
        try{
            const response = await fetch(`${URL_API_PROJETCS}?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        }catch (error){
            return rejectWithValue("L'application est actuellement indisponible. Veuillez réessayer ultérieurement");
        };
    }
)

export const loadActus = createAsyncThunk(
    'benevoles/loadActus',
    async (_, { rejectWithValue }) => {
        try{
            const response = await fetch(URL_API_ACTUS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        }catch (error){
            return rejectWithValue("L'application est actuellement indisponible. Veuillez réessayer ultérieurement");
        };
    }
)

export const loadVolunteer = createAsyncThunk(
    'benevoles/loadVolunteer',
    async (_, { rejectWithValue }) => {
        try{
            const response = await fetch(URL_API_VOLUNTEERS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        }catch (error){
            return rejectWithValue("L'application est actuellement indisponible. Veuillez réessayer ultérieurement");
        };
    }
)

export const addVolunteer = createAsyncThunk(
    'benevoles/addVolunteer',
    async (datas, { rejectWithValue }) => {
        try {
            const res = await fetch(`${URL_API_VOLUNTEERS}?${queryString}`, {
                mmethod: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return res.data;
        } catch (er) {
            return {
                success: false,
                message: `Erreur lors de la création du compte : ${er.message}`
            };
        }
    }
)

export const updateVolunteer = createAsyncThunk(
    'benevoles/updateVolunteer',
    async (datas, { rejectWithValue }) => {
        try {
            const res = await fetch(`${URL_API_VOLUNTEERS}?${queryString}`, {
                mmethod: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (errorAxio){
            return rejectWithValue(errorAxio.response.data.error.message);
        };
    }
)

export const deleteVolunteer = createAsyncThunk(
    'benevoles/deleteVolunteer',
    async (datas, { rejectWithValue }) => {
        try {
            const res = await fetch(`${URL_API_VOLUNTEERS}?${queryString}`, {
                mmethod: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        }catch(errorAxio){
            return rejectWithValue(errorAxio.response.data.error.message);
        };
    }
)