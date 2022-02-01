
import React from "react";
import "./MoviesCard.css"


const Card = (props) => {
    const minutes = props.card.time % 60;
    const hours = (props.card.time - minutes) / 60; // время в минутах
    const time = `${hours < 10 ? '0' + hours : hours}ч ${minutes < 10 ? '0' + minutes : minutes}м`
    const movieCardButtonStyle = props.card._id % 2 === 0 ? 'movie__card-button btn-heart' : `movie__card-button btn-heart-active`
    const savedMovieCardButtonStyle = 'movie__card-button btn-unliked'
    const currentPath = window.location.pathname

    const buttonCardStyle = currentPath === '/movies' ? movieCardButtonStyle : savedMovieCardButtonStyle

    return (
        <li className="movie">
            <img src={props.card.link} className="movie__photo" alt={props.card.name}
                 onClick={() => props.onClick(props.card)}/>
            {/*<button type="button"  onClick={() => props.onCardDelete(props.card)} />*/}
            <div className="movie__description">
                <h2 className="movie__title">
                    {props.card.name}
                </h2>
                <button type="button" className={buttonCardStyle}/>
            </div>
            <p className="movie__duration">{time}</p>
        </li>
    )
}

export default Card;
