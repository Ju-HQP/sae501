import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL_API_ACTUS, URL_API_PROJECTS, URL_API_VOLUNTEERS, test } from '../../utils/config.js';

//fonctions asynchrones pourcommuniquer avec l'api

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
            console.log("ok", response.json());
            return await response.json();
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
    async (datas) => {
        try {
            const res = await fetch(URL_API_VOLUNTEERS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datas),
            });
            return await res.json();
        } catch (er) {
            return {
                success: false,
                message: `Erreur lors de la création du compte : ${er.message}`
            };
        }
    }
)

export const updateVolunteer = createAsyncThunk(
  
)

export const deleteVolunteer = createAsyncThunk(
 
)