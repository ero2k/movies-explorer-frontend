import React from "react";
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState} from "react";

function MoviesCardList(props) {
    const currentPath = window.location.pathname
    const [moviesToShow, setMoviesToShow] = useState([])
    // const classButtonMore = props.cards.length > 0 || props.cards.length > moviesToShow.length ? "movies-list__button" : "movies-list__button movies-list__button-hidden"

    function getInfoLiked() {
        const arraySavedMovies = Object.values(props.savedMovies).map(savedMovie => savedMovie.movieId)
        const isLiked = Object.values(props.allMovies).map(movie => movie)
       // const arr = Object.values(props.savedMovies).map(savedMovie => Object.values(props.allMovies).map(movie => ))
        console.log(props.allMovies)
    }

    getInfoLiked()

    // useEffect(() => {
    //     setMoviesToShow(Object.values(props.cards).slice(0, props.schemeDevice.totalCards))
    // }, [props.cards, props.schemeDevice.totalCards])
    //
    // function addMoreMovies() {
    //     const totalMoviesToShow = moviesToShow.length + props.schemeDevice.download
    //     setMoviesToShow(Object.values(props.cards).slice(0, totalMoviesToShow))
    // }

    return (
        <section className="movies-list max-width">
            <ul className="movies-list__list">
                {
                    moviesToShow.map((card) => (
                        <MoviesCard isLiked={true} page={props.page} key={card.id} card={card} onCardLike={props.onCardLike}
                                    onCardDelete={props.onCardDelete}/>
                    ))
                }
            </ul>
            {currentPath === '/movies' && <button onClick={'addMoreMovies'} className={'classButtonMore'}>Ещё</button>}
        </section>
    )
}

export default MoviesCardList;
