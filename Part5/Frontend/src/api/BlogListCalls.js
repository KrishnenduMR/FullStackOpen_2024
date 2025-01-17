import axios from 'axios';
const baseUrl = '/api/blogs';
const token = localStorage.getItem('token');

const getAll = async (token) => {
    const config = {
        headers: { authorization: `Bearer ${token}` }
    };
    const request = axios.get(baseUrl, config);
    const response = await request;
    console.log(response.data);
    return response.data;
}

const create = async newObject => {
    const config = {
        headers: { authorization: `Bearer ${token}` }
    };
    const request = axios.post(baseUrl, newObject, config);
    const response = await request;
    return response.data;
}

const update = async (id, newObject) => {
    const config = {
        headers: { authorization: `Bearer ${token}` }
    };
    const request = axios.put(`${baseUrl}/${id}`, newObject, config);
    const response = await request;
    return response.data;
}

const remove = async (id) => {
    const config = {
        headers: { authorization: `Bearer ${token}` }
    };
    const request = axios.delete(`${baseUrl}/${id}`, config);
    const response = await request;
    return response.data; 
};

export default { getAll, create, update, remove };