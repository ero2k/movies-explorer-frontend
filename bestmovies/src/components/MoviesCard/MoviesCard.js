// import {CurrentUserContext} from '../contexts/CurrentUserContext'
import React from "react";
import "./MoviesCard.css"
import URL_MOVIES from "../../utils/constants";


const Card = (props) => {
    const minutes = props.card.duration % 60;
    const hours = (props.card.duration - minutes) / 60; // время в минутах
    const time = `${hours < 10 ? '0' + hours : hours}ч ${minutes < 10 ? '0' + minutes : minutes}м`
    const urlImgMovie = `https://api.nomoreparties.co/${props.card.image.url}`

    return (
        <li className="movie">
            <img src={urlImgMovie} className="movie__photo" alt={props.card.name}
                 onClick={() => props.onClick(props.card)}/>
            <div className="movie__description">
                <h2 className="movie__title">
                    {props.card.nameRU}
                </h2>
                <button type="button" className="movie__button-like"/>
            </div>
            <p className="movie__duration">{time}</p>
        </li>
    )
}

export default Card;
