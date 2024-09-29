import axios from 'axios';
const baseUrl = 'https://verbose-tribble-9pq4gp9wg56cxjvp-3001.app.github.dev/api/blogs';
const getAll = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        throw error;
    }
}

const create = async (newObject) => {
    try {
        const response = await axios.post(baseUrl, newObject);
        return response.data;
    } catch (error) {
        console.error('Error creating blog:', error.message);
        throw error;
    }
}

const update = async (id, newObject) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, newObject);
        return response.data;
    } catch (error) {
        console.error('Error updating blog:', error.message);
        throw error;
    }
}

const remove = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting blog:', error.message);
        throw error;
    }
}

export { getAll, create, update, remove };
