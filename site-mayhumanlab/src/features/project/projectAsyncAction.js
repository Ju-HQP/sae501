import {
    createAsyncThunk
} from '@reduxjs/toolkit';
import {
    URL_API_PROJECTS
} from '../../utils/config';

//fonctions asynchrones pour communiquer avec l'api

export const loadProjects = createAsyncThunk(
    'projects/loadProjects',
    async (_, {
        rejectWithValue
    }) => {
        try {
            const response = await fetch(URL_API_PROJECTS, {
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
            return rejectWithValue("Les projets sont indisponibles.");
        }
    }
)

export const addProject = createAsyncThunk(
    'projects/addProject',
    async (dataToSend, {
        rejectWithValue
    }) => {
        try {
            const response = await fetch(URL_API_PROJECTS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            return rejectWithValue("Erreur lors de l'ajout du projet.");
        }
    }
)

export const updateProject = createAsyncThunk(
    'projects/updateProject',
    async (dataToSend, {rejectWithValue}) => {
        try {
            const response = await fetch(`${URL_API_PROJECTS}/${dataToSend.id_projet}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            return rejectWithValue("Erreur lors de la modification du projet.");
        }
    }
)

export const saveProject = createAsyncThunk(
    'projects/saveProject',
    async (dataToSend, {dispatch,getState}) => {
        try {
            if (getState().project.idProject) {
                dispatch(updateProject(dataToSend));
            } else {
                dispatch(addProject(dataToSend));
            }
        } catch (er) {
            throw new Error(er);
        }
    }
)

export const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async (dataToSend, {rejectWithValue}) => {
        try {
            const response = await fetch(`${URL_API_PROJECTS}/${dataToSend.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            return dataToSend.id;
        } catch (error) {
            return rejectWithValue("Erreur lors de la suppression du projet.");
        }
    }
)