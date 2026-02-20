const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
};

// console.log("Headers are ", getHeaders());


export const apiService = {
    // Auth
    login: async (email: any, password: any) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return res.json();
    },
    register: async (username: any, email: any, password: any) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });
        return res.json();
    },
    getProfile: async () => {
        const res = await fetch(`${API_URL}/auth/profile`, {
            headers: getHeaders(),
        });
        return res.json();
    },

    // Tasks
    getTasks: async () => {
        const res = await fetch(`${API_URL}/tasks`, {
            headers: getHeaders(),
        });
        return res.json();
    },
    createTask: async (taskData: any) => {
        const res = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(taskData),
        });
        return res.json();
    },
    updateTask: async (id: any, taskData: any) => {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(taskData),
        });
        return res.json();
    },
    deleteTask: async (id: any) => {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return res.json();
    },

    // Posts
    getPosts: async () => {
        const res = await fetch(`${API_URL}/posts`, {
            headers: getHeaders(),
        });
        return res.json();
    },
    createPost: async (postData: any) => {
        const res = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(postData),
        });
        return res.json();
    },
    updatePost: async (id: any, postData: any) => {
        const res = await fetch(`${API_URL}/posts/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(postData),
        });
        return res.json();
    },
    deletePost: async (id: any) => {
        const res = await fetch(`${API_URL}/posts/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return res.json();
    },

    // Search
    search: async (query: any) => {
        const res = await fetch(`${API_URL}/search?q=${query}`, {
            headers: getHeaders(),
        });
        return res.json();
    },
};
