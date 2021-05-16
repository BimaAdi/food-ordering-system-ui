const API = {
    url: 'http://localhost:8000/api',
    defaultHeader: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    }
};

export default API;
