# Food Ordering System

# Requirements
- Node version >= 12

# Installation
1. npm install
1. edit src/config.js based on backend IP and Port
```
const API = {
    url: 'http://{backend_ip:backend:port}/api',
    defaultHeader: () => {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
    } 
};

export default API;

```
1. npm start
