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

    return (
        <>
            <Header onOpen={props.onOpen} isLoggedIn={props.isLoggedIn} page={props.page}/>
            <main>
                <SearchForm
                    onSubmit={props.onSubmit} handleCheckBox={props.handleCheckBox}
                    checkbox={props.lastState.checkbox} phrase={props.lastState.phrase}
                />

                {!props.isOpenPreloader ?
                    !!props.lastState.movies && props.lastState.movies.length > 0 ?
                        <MoviesCardList
                                        filteredMovies={props.lastState.movies}
                                        savedMovies={props.savedMovies}

                                        page='movies' size={windowDimensions}
                                        schemeDevice={getCurrentDeviceScheme(windowDimensions.width)}
                                        likedMovie={props.likedMovie} deleteMovie={props.deleteMovie} />
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
