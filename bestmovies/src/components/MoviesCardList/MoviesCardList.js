import React from "react";
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState} from "react";

function MoviesCardList(props) {
    const [moviesToShow, setMoviesToShow] = useState([])
    const [buttonMoreStyle, setButtonMoreStyle] = useState('')

    const idSavedMovies = Object.values(props.savedMovies).map(savedMovie => savedMovie.movieId)

    useEffect(() => {
        if (props.page === 'movies') {

            if (props.filteredMovies.length > 0 && props.filteredMovies.length > moviesToShow.length) {
                setButtonMoreStyle("movies-list__button")
                return
            }
        }
        setButtonMoreStyle("movies-list__button movies-list__button-hidden")
    }, [moviesToShow, props.filteredMovies.length, moviesToShow.length, props.page])

    useEffect(() => {
        if (!!props.filteredMovies) {
            setMoviesToShow(Object.values(props.filteredMovies).slice(0, props.schemeDevice.totalCards))
        }
    }, [props.filteredMovies, props.schemeDevice.totalCards])

    useEffect(() => {
        if (!props.filteredMovies) {
            setMoviesToShow(Object.values(props.savedMovies).slice(0, props.schemeDevice.totalCards))
        }
    }, [props.savedMovies, props.filteredMovies, props.schemeDevice.totalCards])

    function addMoreMovies() {
        const totalMoviesToShow = moviesToShow.length + props.schemeDevice.download
        setMoviesToShow(Object.values(props.filteredMovies).slice(0, totalMoviesToShow))
    }

    return (
        <section className="movies-list max-width">
            <ul className="movies-list__list">
                {
                    moviesToShow.map((card) => (
                        <MoviesCard isLiked={!!props.isLiked ? props.isLiked : idSavedMovies.includes(card.id)}
                                    page={props.page} key={!!card.id ? card.id : card.movieId} card={card}
                                    likedMovie={props.likedMovie} saveMovies={props.savedMovies}
                                    onDeleteMovie={props.deleteMovie}
                        />
                    ))
                }
            </ul>
            <button onClick={addMoreMovies} className={buttonMoreStyle}>Ещё</button>
        </section>
    )
}

export default MoviesCardList;
