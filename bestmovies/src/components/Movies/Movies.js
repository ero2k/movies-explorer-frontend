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

    function handleInputChange(e) {
        props.handleInput(e.target.value)
    }

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

    useEffect(() => {
        props.setMessage('')
    },[])

    return (
        <>
            <Header onOpen={props.onOpen} isLoggedIn={props.isLoggedIn} page={props.page}/>
            <main>
                <SearchForm onSubmit={props.submitSearch} onChange={handleInputChange} value={props.searchPhrase}
                            checked={props.isShortMovie} onChangeChecked={props.handleCheckbox}/>

                { !props.isOpenPreloader ?
                        props.filteredMovies.length > 0 ?
                    <MoviesCardList savedMovies={props.savedMovies} deleteMovie={props.deleteMovie}
                                    filteredMovies={props.filteredMovies} size={windowDimensions} page='movies'
                                    schemeDevice={getCurrentDeviceScheme(windowDimensions.width)}
                                    likedMovie={props.likedMovie}/>
                            : <div className={'movies__div-error'}>{props.message}</div>
                    :
                    <Preloader isOpen={props.isOpenPreloader}/>
                }

            </main>
            <Footer/>
        </>
    )
}

export default Movies;
