import {
    createAsyncThunk
} from '@reduxjs/toolkit';
import {
    URL_API_PROJECTS
} from '../../utils/config.js';

//fonctions asynchrones pour communiquer avec l'api

export const loadProjects = createAsyncThunk(
    'projets/loadProjets',
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
