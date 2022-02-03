import React from "react";
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    const currentPath = window.location.pathname
    return (
        <section className="movies-list max-width">
            <ul className="movies-list__list">
                {
                    props.cards.map((card) => (
                        <MoviesCard key={card._id} card={card} onCardLike={props.onCardLike}
                              onCardDelete={props.onCardDelete}/>
                    ))
                }
            </ul>
            {currentPath === '/movies' && <button className="movies-list__button">Ещё</button>}
        </section>
    )
}

export default MoviesCardList;
