import React from "react";
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState} from "react";

function MoviesCardList(props) {
    const [moviesToShow, setMoviesToShow] = useState([])
    const [buttonMoreStyle, setButtonMoreStyle] = useState('')
    const idSavedMovies = Object.values(props.savedMovies).map(savedMovie => savedMovie.movieId)

    useEffect(() => {
        if(props.page === 'movies'){
            console.log(props.allMovies.length > 0 || props.allMovies.length > moviesToShow.length)
            if(props.allMovies.length > 0 && props.allMovies.length > moviesToShow.length){
                setButtonMoreStyle ("movies-list__button")
                return
            }
        }
       setButtonMoreStyle("movies-list__button movies-list__button-hidden")
    }, [moviesToShow])

    useEffect(() => {
        if (!!props.allMovies){
            setMoviesToShow(Object.values(props.allMovies).slice(0, props.schemeDevice.totalCards))
        }
    }, [props.allMovies, props.schemeDevice.totalCards])

    useEffect(() => {
        if (!props.allMovies) {
            setMoviesToShow(Object.values(props.savedMovies).slice(0, props.schemeDevice.totalCards))
            console.log(props.savedMovies)
        }
    }, [props.savedMovies])

    function addMoreMovies() {
        const totalMoviesToShow = moviesToShow.length + props.schemeDevice.download
        setMoviesToShow(Object.values(props.allMovies).slice(0, totalMoviesToShow))
    }

    return (
        <section className="movies-list max-width">
            <ul className="movies-list__list">
                {
                    moviesToShow.map((card) => (
                        <MoviesCard isLiked={!!props.isLiked ? props.isLiked : idSavedMovies.includes(card.id)} page={props.page} key={card.id} card={card}
                                    likedMovie={props.likedMovie} saveMovies={props.savedMovies} onDeleteMovie={props.deleteMovie}
                                    // idCardOnLocalDB={idSavedMovies.includes(card.id) && getIdSavedMovies(card.id)}
                                    // onCardDelete={getIdSavedMovies(card.id)  }
                        />
                    ))
                }
            </ul>
            <button onClick={addMoreMovies} className={buttonMoreStyle}>Ещё</button>
        </section>
    )
}

export default MoviesCardList;
