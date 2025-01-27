import axios from 'axios';

const BASE_URL = 'https://wger.de/api/v2';
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export interface Exercise {
    id: number;
    name: string;
    description: string;
    category: {
        id: number;
        name: string;
    };
    exercises: {
        id: number;
        name: string;
        description: string;
        [key: string]: any;
    }[];
}

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