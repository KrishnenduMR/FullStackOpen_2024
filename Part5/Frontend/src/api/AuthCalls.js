const loginUrl = '/api/auth/login'
const registerUrl = '/api/auth/register'
import axios from 'axios';

const login = async (username, password) => {
    const response = await axios.post(loginUrl, username, password );
    return response;
}

const register = async (data) => {
    const response = await axios.post(registerUrl, data);
    return response.data;
}

const getUser = async (token) => {
    const response = await axios.get('/api/auth/user', {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export default { login, register, getUser };
