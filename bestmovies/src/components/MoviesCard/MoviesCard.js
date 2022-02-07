import React from "react";
import "./MoviesCard.css"

const Card = (props) => {
    const minutes = props.card.duration % 60;
    const hours = (props.card.duration - minutes) / 60; // время в минутах
    const time = `${hours < 10 ? '0' + hours : hours}ч ${minutes < 10 ? '0' + minutes : minutes}м`
    const movieCardButtonStyle = props.isLiked ? `movie__card-button btn-heart-active` : 'movie__card-button btn-heart'
    const savedMovieCardButtonStyle = 'movie__card-button btn-unliked'
    const urlImgMovie = !!props.card.image.url ? `https://api.nomoreparties.co${props.card.image.url}` : props.card.image
    const thumbnailUrl = !!props.card.image.formats ? `https://api.nomoreparties.co${props.card.image.formats.thumbnail.url}` : `${props.card.thumbnail}`
    const trailer = !!props.card.trailerLink ? props.card.trailerLink : props.card.trailer

    const movieDataForSave = {
        'country': props.card.country,
        'director': props.card.director,
        'duration': props.card.duration,
        'year': props.card.year,
        'description': props.card.description,
        'image': `https://api.nomoreparties.co${props.card.image.url}`,
        'trailer': props.card.trailerLink,
        'thumbnail': `${thumbnailUrl}`,
        'movieId': props.card.id,
        'nameRU': props.card.nameRU,
        'nameEN': props.card.nameEN,
    }


    function getIdSavedMovies(card) {
        const movie = props.saveMovies.filter(saveMovie => saveMovie.movieId === card)
        console.log(props.saveMovies)
        return movie[0]._id
    }


    const handleLikeMovie = () => {
        let idMovieInLocalDB = ''
        if (!props.isLiked) {
            return props.likedMovie(movieDataForSave, localStorage.getItem('jwt'))
        }

        if (props.page === 'movies') {
            idMovieInLocalDB = getIdSavedMovies(props.card.id)
        } else {
            idMovieInLocalDB = props.card._id
        }

        return props.onDeleteMovie(idMovieInLocalDB, localStorage.getItem('jwt'))
    }

    const buttonCardStyle = props.page === 'movies' ? movieCardButtonStyle : savedMovieCardButtonStyle

    return (
        <li className="movie">
            <img src={urlImgMovie} className="movie__photo" alt={props.card.name}
                 onClick={() => window.open(trailer)}/>
            <div className="movie__description">
                <h2 className="movie__title">
                    {props.card.nameRU}
                </h2>
                <button onClick={handleLikeMovie} type="button" className={buttonCardStyle}/>
            </div>
            <p className="movie__duration">{time}</p>
        </li>
    )
}

export default Card;
