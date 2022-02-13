import React, {useEffect, useState} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {DURATION_SHORT_MOVIE} from "../../utils/constants";


function SavedMovies(props) {
    const [isChecked, setIsChecked] = useState(false)
    const [moviesFiltered, setMoviesFiltered] = useState([])

    console.log(props.filteredMovies)

    useEffect(()=>{
        if(isChecked){
            setMoviesFiltered(props.filteredMovies.filter(movie => movie.duration <= DURATION_SHORT_MOVIE))
        } else {
            setMoviesFiltered(props.filteredMovies)
        }

    },[isChecked])

    function handleInputChange(e) {
        props.handleInput(e.target.value)
    }

    useEffect(() => {
        props.setSavedMovies(props.savedMovies)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Header onOpen={props.onOpen} isLoggedIn={props.isLoggedIn} page={props.page}/>
            <main>

                <SearchForm onSubmit={props.onSubmitSearchForm} onChange={handleInputChange}
                            value={props.searchPhrase} currentPage='saved-movies'
                            checked={false} onChangeChecked={props.handleCheckbox}
                            savedIsShortMovie={setIsChecked}
                />
                {
                    moviesFiltered.length > 0 ?
                        <MoviesCardList deleteMovie={props.deleteMovie} likedMovie={props.likedMovie} isLiked={true}
                                        filteredMovies={moviesFiltered} savedMovies={moviesFiltered}
                                        schemeDevice={{'totalCards': moviesFiltered.length}}
                        />
                        :
                        <div className={'movies__div-error'}>Ничего не найдено</div>

                }

            </main>
            <Footer/>
        </>
    )
}

export default SavedMovies;
