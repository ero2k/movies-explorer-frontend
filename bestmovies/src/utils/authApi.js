import {URL_LOCALDB} from "./constants";

const checkResponse = (response) => {
    return response.ok ? response.json() : Promise.reject(response);
};

const headers = {
    'Content-Type': 'application/json',
};

export const register = ({password, email, name}) => {
    return fetch(`${URL_LOCALDB}/signup`, {
        headers:{
            ...headers
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({name, email, password}),
    }).then(res => checkResponse(res));
};

export const getEmail = (token) => {
    return fetch(`${URL_LOCALDB}/users/me`, {
        method: 'GET',
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(res => checkResponse(res));
};


export const authorize = ({password, email}) => {
    return fetch(`${URL_LOCALDB}/signin`, {
        headers:{
            ...headers
        },
        method: 'POST',
        body: JSON.stringify({password, email}),
    })
        .then(res => checkResponse(res));
};
