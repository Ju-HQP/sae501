import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL_API_VOLUNTEERS } from '../../utils/config.js';

//fonctions asynchrones pour communiquer avec l'api

export const loadVolunteer = createAsyncThunk(
    'benevoles/loadVolunteer',
    async (_, { rejectWithValue }) => {
        // if(checkAuthStatus){
        try{
            const response = await fetch(URL_API_VOLUNTEERS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:'include' // important pour conserver le cookie de session
            });
            if (response.redirected){
                return rejectWithValue("Vous n'êtes pas connecté");
             }
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
    'benevoles/saveVolunteer',
    async (datas,{dispatch,getState}) => {
           if(getState().volunteer.idVolunteerModifying){
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
                credentials:'include', // important pour conserver le cookie de session
                body: JSON.stringify(datas)
            });
            if (res.status === 403){
                return rejectWithValue("Désolé, vous n'avez pas les autorisations requises pour effectuer cette action.");
            }
            return await res.json();
        } catch (er) {
            return rejectWithValue(er.response.data.error.message)
        }
    }
)

export const updateVolunteer = createAsyncThunk(
    'benevoles/updateVolunteer',
    async (datas, { rejectWithValue }) => {
        try {
            const response = await fetch(`${URL_API_VOLUNTEERS}/${datas.id_benevole}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:'include',
                body: JSON.stringify(datas),
            });
            if (response.status === 403){
                return rejectWithValue("Désolé, vous n'avez pas les autorisations requises pour effectuer cette action.");
            }
            return await response.json();
        } catch (error){
            return rejectWithValue(error.response.data.error.message);
        };
    }
)

export const deleteVolunteer = createAsyncThunk(
    'benevoles/deleteVolunteer',
    async (datas, { rejectWithValue }) => {
        try {
            const response = await fetch(`${URL_API_VOLUNTEERS}/${datas.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:'include',
            });
            if (response.status === 403){
                return rejectWithValue("Désolé, vous n'avez pas les autorisations requises pour effectuer cette action.");
            }
            if(response.status === 204){
                return datas.id;
            }
        }catch(error){
            return rejectWithValue(error.response.data.error.message);
        };
    }
)