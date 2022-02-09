export const URL_MOVIES = "https://api.nomoreparties.co/beatfilm-movies"
// export const URL_LOCALDB = "https://api.bestmovies.nomoredomains.monster"
export const URL_LOCALDB = "http://localhost:3001"
export const DURATION_SHORT_MOVIE = 40

const LOADED_MOVIES = {
    'desktop': {
        'totalCards': 12,
        'columns': 3,
        'download': 4
    },
    'tablet': {
        'totalCards': 8,
        'columns': 2,
        'download': 2
    },
    'mobile': {
        'totalCards': 5,
        'columns': 1,
        'download': 2
    }
}


export {
 LOADED_MOVIES
}
