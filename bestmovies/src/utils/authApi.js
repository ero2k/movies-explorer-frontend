import {URL_LOCALDB} from "./constants";

const checkResponse = (response) => {
    return response.ok ? response.json() : Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));
};

const headers = {
    'Content-Type': 'application/json',
};

export const register = ({password, email, name}) => {
    return fetch(`${URL_LOCALDB}/signup`, {
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({password, email, name}),
    }).then(res => checkResponse(res));
};
// export const test = () => {
//     return fetch(`${URL_LOCALDB}/`, {
//
//         // // mode: 'no-cors',
//         // method: 'GET',
//         // // body: JSON.stringify({password, email, name}),
//         // accept: '*/*'
//     }).then(res => checkResponse(res));
// };

// export const authorize = ({password, email}) => {
//     return fetch(`${URL_LOCALDB}/signin`, {
//         headers,
//         method: 'POST',
//         // credentials: 'include',
//         body: JSON.stringify({password, email}),
//     })
//         .then(res => checkResponse(res));
// };
//
// export const getEmail = (token) => {
//     return fetch(`${URL_LOCALDB}/users/me`, {
//         method: 'GET',
//         headers: {
//             ...headers,
//             'Authorization': `Bearer ${token}`,
//         },
//     })
//         .then(res => checkResponse(res));
// };
