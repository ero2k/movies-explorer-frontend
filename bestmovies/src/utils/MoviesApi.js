import URL_MOVIES from '../utils/constants'

class Api {
    constructor({
                    baseUrl,
                }) {
        this._url = baseUrl;
    }

    _fetchRequest(path, method = 'GET', {
        ...body
    } = '') {
        return fetch(`${this._url}${path}`, {
            method: `${method}`,
            body: method.indexOf('GET', 'DELETE') ? JSON.stringify({
                ...body
            }) : null
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })

    }

    getInitialCards() {
        return this._fetchRequest('/')
    }

}

const api = new Api({
    baseUrl: URL_MOVIES,
});


export default api;
