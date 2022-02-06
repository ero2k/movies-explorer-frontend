import React from "react";
import "./MoviesCard.css"
import apiMain from "../../utils/MainApi";


const Card = (props) => {
    const minutes = props.card.duration % 60;
    const hours = (props.card.duration - minutes) / 60; // время в минутах
    const time = `${hours < 10 ? '0' + hours : hours}ч ${minutes < 10 ? '0' + minutes : minutes}м`
    const movieCardButtonStyle = props.card._id === 0 ? 'movie__card-button btn-heart' : `movie__card-button btn-heart-active`
    const savedMovieCardButtonStyle = 'movie__card-button btn-unliked'
    const urlImgMovie = `https://api.nomoreparties.co${props.card.image.url}`
    const thumbnailUrl = `https://api.nomoreparties.co${props.card.image.formats.thumbnail.url}`

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

    const buttonCardStyle = props.page === 'movies' ? movieCardButtonStyle : savedMovieCardButtonStyle
    console.log(movieDataForSave)

    const likeMovie = () => {
       return  apiMain.likedMovie({...movieDataForSave}, localStorage.getItem('jwt'))
    }

    return (
        <li className="movie">
            <img src={urlImgMovie} className="movie__photo" alt={props.card.name}
                 onClick={() => props.onClick(props.card)}/>
            <div className="movie__description">
                <h2 className="movie__title">
                    {props.card.nameRU}
                </h2>
                <button onClick={likeMovie} type="button" className={buttonCardStyle}/>
            </div>
            <p className="movie__duration">{time}</p>
        </li>
    )
}

export default Card;
