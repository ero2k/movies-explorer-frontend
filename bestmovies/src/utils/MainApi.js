import {URL_LOCALDB} from '../utils/constants'

class ApiMain {
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

    // getInitialCards() {
    //     return this._fetchRequest('/')
    // }

    // likedMovie(idMovie, isLiked) {
    //     const method = isLiked ? 'DELETE' : 'POST'
    //     return this._fetchRequest(`/cards/${idMovie}/likes`, `${method}`)
    // }
    //
    likedMovie(movie) {
        console.log(URL_LOCALDB)
        return this._fetchRequest(`/movies`, 'POST', movie)
    }
}

const apiMain = new ApiMain({
    baseUrl: URL_LOCALDB,
});

export default apiMain;
