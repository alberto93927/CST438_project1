import axios from 'axios';

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

export const getExerciseDetail = async (id: number) => {
    try {
        const response = await api.get(`/exercisebaseinfo/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching exercise detail');
        throw error;
    }
};

export const getLanguages = async () => {
    try {
      const response = await api.get('/language/');
      return response.data.results; 
    } catch (error) {
      console.error('Error fetching languages');
      throw error;
    }
  };
