// import {CurrentUserContext} from '../contexts/CurrentUserContext'
import React from "react";
import "./MoviesCard.css"


const Card = (props) => {
    const minutes = props.card.time % 60;
    const hours = (props.card.time - minutes) / 60; // время в минутах
    const time = `${hours < 10 ? '0' + hours : hours}ч ${minutes < 10 ? '0' + minutes : minutes}м`

    // const currentUser =  React.useContext(CurrentUserContext);
    // const visibleTrashBtn = currentUser._id === props.card.owner ? "place__trash" : "place__trash trashbtn-hidden"
    //
    // const isLiked = (i) => i === currentUser._id;
    //
    // const selectedLike =  props.card.likes.some(isLiked) ? "place__like place__like_selected" : "place__like"

    return (
        <li className="movie">
            <img src={props.card.link} className="movie__photo" alt={props.card.name}
                 onClick={() => props.onClick(props.card)}/>
            {/*<button type="button"  onClick={() => props.onCardDelete(props.card)} />*/}
            <div className="movie__description">
                <h2 className="movie__title">
                    {props.card.name}
                </h2>
                <button type="button" className="movie__button-like"/>
            </div>
            <p className="movie__duration">{time}</p>
        </li>
    )
}

export default Card;
