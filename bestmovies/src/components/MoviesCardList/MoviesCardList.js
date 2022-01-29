import React from "react";
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState} from "react";

function MoviesCardList(props) {
    const [moviesToShow, setMoviesToShow] = useState([])
    const classButtonMore = props.cards.length > 0 || props.cards.length > moviesToShow.length ? "movies-list__button" : "movies-list__button movies-list__button-hidden"

    console.log(moviesToShow)

    useEffect(() => {
        setMoviesToShow(Object.values(props.cards).slice(0, props.schemeDevice.totalCards))
    }, [props.cards, props.schemeDevice.totalCards])

    function addMoreMovies() {
        const totalMoviesToShow = moviesToShow.length + props.schemeDevice.download
        setMoviesToShow(Object.values(props.cards).slice(0, totalMoviesToShow))
    }

    return (
        <section className="movies-list__section max-width">
            <ul className="movies-list__list">
                {
                    moviesToShow.map((card) => (
                        <MoviesCard key={card.id} card={card} onCardLike={props.onCardLike}
                                    onCardDelete={props.onCardDelete}/>
                    ))
                }
            </ul>
            <button onClick={addMoreMovies} className={classButtonMore}>Ещё</button>
        </section>
    )
}

export default MoviesCardList;
