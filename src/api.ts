import axios from 'axios';

const API_URL = 'http://127.0.0.1:3030/api';

interface User {
    username: string;
    password: string;
}

export const registerUser = async (user: User) => {
    try {
        const response = await axios.post(`${API_URL}/register`, user);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (user: User) => {
    try {
        const response = await axios.post(`${API_URL}/login`, user);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/test/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

export const deleteAllUsers = async () => {
    try {
        const response = await axios.delete(`${API_URL}/test/all`);
        return response.data;
    } catch (error) {
        console.error('Error deleting all users:', error);
        throw error;
    }
};
