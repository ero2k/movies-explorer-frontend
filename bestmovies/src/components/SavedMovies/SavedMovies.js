import React, {useEffect} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


function SavedMovies(props) {
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

                <SearchForm onSubmit={props.onSubmitSearchForm} onChange={handleInputChange} value={props.searchPhrase}
                            checked={props.isShortMovie} onChangeChecked={props.handleCheckbox}/>
                {
                    props.filteredMovies.length > 0 ?
                        <MoviesCardList deleteMovie={props.deleteMovie} likedMovie={props.likedMovie} isLiked={true}
                                        filteredMovies={props.filteredMovies} savedMovies={props.filteredMovies}
                                        schemeDevice={{'totalCards': props.filteredMovies.length}}
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
