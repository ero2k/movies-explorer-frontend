import React, {useEffect, useState} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


function SavedMovies(props) {
    const [moviesFiltered, setMoviesFiltered] = useState([])
    const [searchPhrase, setSearchPhrase] = useState('')

    function handleInputChange(e) {
        setSearchPhrase(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        const filterByPhrase = props.savedMovies.filter(movie => movie.nameRU.toLowerCase().trim().includes(searchPhrase.toLowerCase()))

        if(!props.isShortMovie){
            setMoviesFiltered(filterByPhrase)
            return
        }

       setMoviesFiltered(filterByPhrase.filter(movie => movie.duration < 41))
    }

    useEffect(() => {
        setMoviesFiltered(props.savedMovies)
    }, [props.savedMovies])


    return (
        <>
            <Header onOpen={props.onOpen} isLoggedIn={props.isLoggedIn} page={props.page}/>
            <main>
                <SearchForm onSubmit={handleSubmit} onChange={handleInputChange} value={searchPhrase} checked={props.isShortMovie} onChangeChecked={props.handleCheckbox}/>
                <MoviesCardList deleteMovie={props.deleteMovie} likedMovie={props.likedMovie} isLiked={true}
                                savedMovies={moviesFiltered} schemeDevice={{'totalCards': props.savedMovies.length}}
                               />
            </main>
            <Footer/>
        </>
    )
}

export default SavedMovies;
