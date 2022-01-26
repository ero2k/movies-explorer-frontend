import React from "react";
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard";
import {LOADED_MOVIES} from "../../utils/constants";

const MoviesCardList = React.memo ((props) => {
    // const [moviesToShow, setMoviesToShow] = React.useState()

    console.log('MoviesCardList', props.size.width)
    console.log('MoviesCardList', props.schemeDevice)

    return (
        <section className="movies-list__section max-width">
            <ul className="movies-list__list">
                {
                    props.cards.map((card) => (
                        <MoviesCard key={card.id} card={card} onCardLike={props.onCardLike}
                              onCardDelete={props.onCardDelete}/>
                    ))
                }
            </ul>
            <button className="movies-list__button">Ещё</button>
        </section>
    )
})

export default MoviesCardList;
