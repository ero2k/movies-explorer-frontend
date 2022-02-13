import React from "react";
import {useState, useEffect} from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import {LOADED_MOVIES} from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import "./Movies.css"


function Movies(props) {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [messageError, setMessageError] = useState('');


    // function handleInputChange(e) {
    //     props.handleInput(e.target.value)
    // }

    function getCurrentDeviceScheme(windowWidth) {
        if (windowWidth > 1279) {
            return LOADED_MOVIES.desktop
        } else if (windowWidth > 479) {
            return LOADED_MOVIES.tablet
        } else {
            return LOADED_MOVIES.mobile
        }
    }

    function getWindowDimensions() {
        const {innerWidth: width} = window;
        return {
            width
        };
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // useEffect(() => {
    //
    // }, []);

    useEffect(() => {
        if(!!props.filteredMovies.movies){
            if (props.filteredMovies.movies.length === 0) {
                setMessageError('Ничего не найдено!')
            }
        }

    }, [])

    // console.log(props.filteredMovies.movies.length)

    return (
        <>
            <Header onOpen={props.onOpen} isLoggedIn={props.isLoggedIn} page={props.page}/>
            <main>
                <SearchForm onSubmit={props.submitSearch}
                    // savedSearchPhrase={props.savedSearchPhrase}
                            inputChange={props.handleInput} value={props.searchPhrase}
                            currentPage='movies'
                            phraseFromLS={props.filteredMovies.searchPhrase}
                            // checked={props.filteredMovies.isShortMovie}
                            checked={props.checked}
                            handleCheckBox={props.handleCheckbox}

                    savedIsShortMovie={props.savedIsShortMovie}
                />

                {!props.isOpenPreloader ?
                    !!props.filteredMovies.movies && props.filteredMovies.movies.length > 0 ?
                        <MoviesCardList savedMovies={props.savedMovies} deleteMovie={props.deleteMovie}
                                        filteredMovies={props.filteredMovies.movies} size={windowDimensions}
                                        page='movies'
                                        schemeDevice={getCurrentDeviceScheme(windowDimensions.width)}
                                        likedMovie={props.likedMovie}/>
                        : <div className={'movies__div-error'}>{messageError}</div>
                    :
                    <Preloader isOpen={props.isOpenPreloader}/>
                }

            </main>
            <Footer/>
        </>
    )
}

export default Movies;
