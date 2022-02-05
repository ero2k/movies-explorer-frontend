import {URL_LOCALDB} from '../utils/constants'

class ApiMain {
    constructor({
                    baseUrl,
                }) {
        this._url = baseUrl;
    }

    _fetchRequest(path, method = 'GET', {
        ...body
    } = '', jwt = '') {
        return fetch(`${this._url}${path}`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            method: `${method}`,
            body: method.indexOf('GET', 'DELETE') ? JSON.stringify({
                ...body
            }) : null
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            console.log(res)
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    saveProfile (data, token)  {
        return this._fetchRequest('/users/me', 'PATCH', data, token)
    }

    likedMovie(movie) {
        console.log(URL_LOCALDB)
        return this._fetchRequest(`/movies`, 'POST', movie)
    }
}

const apiMain = new ApiMain({
    baseUrl: URL_LOCALDB,
});

export default apiMain;
