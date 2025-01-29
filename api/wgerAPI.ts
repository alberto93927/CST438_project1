import axios from 'axios';
//import {exercise} from 'exercise';

const BASE_URL = 'https://wger.de/api/v2';
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});



export const getExercises = async (params = {}) => {
    try {
        const response = await api.get('/exercisebaseinfo/', {
            params: { language: 2, ...params }
        });
        return response.data.results;
    }
    catch (error) {
        console.error('error fetching exercises');
        throw error;
    }
};