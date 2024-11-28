import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL_API_VOLUNTEERS } from '../../utils/config.js';

//fonctions asynchrones pour communiquer avec l'api

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
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            const data = await response.json();
            return data;
        }catch (error){
            return rejectWithValue("L'application est actuellement indisponible. Veuillez réessayer ultérieurement");
        };
    }
)

export const saveVolunteer = createAsyncThunk(
    'benevoles/saveBenevole',
    (datas,{
        dispatch,
        getState
    }) => {
        const id= getState().idVolunteerModifying
        if(id){
            dispatch(updateVolunteer(datas));
        } else {
            dispatch(addVolunteer(datas));
        }
    }
)

export const addVolunteer = createAsyncThunk(
    'benevoles/addVolunteer',
    async (datas, {rejectWithValue}) => {
        try {
            const res = await fetch(URL_API_VOLUNTEERS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datas)
            });
            return await res.json();
        } catch (er) {
            return rejectWithValue(+ er.response.data.error.message)
        }
    }
)

export const updateVolunteer = createAsyncThunk(
    'benevoles/updateVolunteer',
    async (datas, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams(datas).toString();
            const response = await fetch(`${URL_API_VOLUNTEERS}?${queryString}`, {
                method: 'PUT',
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
            const queryString = new URLSearchParams(datas).toString();
            const response = await fetch(`${URL_API_VOLUNTEERS}?${queryString}`, {
                method: 'DELETE',
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