import {
    createAsyncThunk
} from '@reduxjs/toolkit';
import {
    URL_API
} from '../../utils/config.js';

//fonctions asynchrones pourcommuniquer avec l'api

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
    'benevoles/creerCompteBenevole',
    async (datas) => {
        try {
            const res = await fetch(URL_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datas),
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

)

export const deleteVolunteer = createAsyncThunk(

)