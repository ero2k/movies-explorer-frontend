import React from "react";
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect} from "react";
import {LOADED_MOVIES} from "../../utils/constants";

function MoviesCardList(props) {
    const [moviesToShow, setMoviesToShow] = React.useState([])
    const tes = Object.values(props.cards).slice(0, 5)

    useEffect(() => {
            if (tes.length > 0) {
                setMoviesToShow(tes)
                console.log('tes')
            }
            console.log('tes1')
        },[]
    )

    console.log('MoviesCardList', moviesToShow)
    console.log('MoviesCardList', tes)

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
            <button className="movies-list__button">Ещё</button>
        </section>
    )
}

export default MoviesCardList;
