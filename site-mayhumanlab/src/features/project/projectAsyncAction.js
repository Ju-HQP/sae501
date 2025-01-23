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
            if (response.status === 403) {
                throw new Error('Désolé, vous n\'avez pas les autorisations requises pour effectuer cette action.');
            }
            if (response.status === 409) { // Conflit avec les autres données
                const error = await response.json();
                throw new Error(error.message);
            }
            return await response.json();
        } catch (error) {
            // création de l'objet errorObj pour transmettre les données écrites précédemment
            const errorObj = {
                message: error.message ?? "Désolé, l'ajout du projet a rencontré une erreur.",
                dataSend: dataToSend
            }
            return rejectWithValue(errorObj);
        }
    }
)

export const updateProject = createAsyncThunk(
    'projects/updateProject',
    async (dataToSend, {
        rejectWithValue
    }) => {
        try {
            const response = await fetch(`${URL_API_PROJECTS}/${dataToSend.id_projet}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
                credentials: 'include'
            });
            if (response.status === 403) {
                throw new Error('Désolé, vous n\'avez pas les autorisations requises pour effectuer cette action.');
            }
            if (response.status === 409) { // Conflit avec les autres données
                const error = await response.json();
                throw new Error(error.message);
            }
            return await response.json();
        } catch (error) {
            // création de l'objet errorObj pour transmettre les données écrites précédemment
            const errorObj = {
                message: error.message ?? "Désolé, la mise à jour du projet a rencontré une erreur.",
                dataSend: dataToSend
            }
            return rejectWithValue(errorObj);
        }
    }
)

export const saveProject = createAsyncThunk(
    'projects/saveProject',
    async (dataToSend, {
        dispatch,
        getState
    }) => {
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
    async (dataToSend, {
        rejectWithValue
    }) => {
        try {
            const response = await fetch(`${URL_API_PROJECTS}/${dataToSend.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (response.status === 403){
                throw new Error('Désolé, vous n\'avez pas les autorisations requises pour effectuer cette action.');
            }
            if(response.status === 404){
                const error = await response.json();
                throw new Error(error.message);
            }
            if(response.status === 204){
                return dataToSend.id;
            }
        } catch (error) {
            return rejectWithValue(error.message?? "Erreur lors de la suppression du projet.");
        }
    }
)