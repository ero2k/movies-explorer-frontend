import React from "react";
import "../../index.css"
import "./App.css"
import Main from "../Main/Main"
import Header from "../Header/Header"
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import {Route, Switch, useHistory} from 'react-router-dom';
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Menu from "../Menu/Menu";
import {useState, useEffect} from 'react';
import {register, getEmail, authorize} from "../../utils/authApi";
import apiMain from "../../utils/MainApi"
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import apiMovies from "../../utils/MoviesApi";

document.documentElement.lang = 'ru'


function App() {
    const [isCloseMenu, setCloseMenu] = useState(false)
    const [isOpenPreloader, setOpenPreloader] = useState(false)
    const [authSuccess, setAuthSuccess] = useState(false)
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    const [allMoviesArray, setAllMoviesArray] = useState([])
    const [savedMoviesArray, setSavedMoviesArray] = useState([])
    const [allMoviesFiltered, setAllMoviesFiltered] = useState([])
    const [savedMoviesFiltered, setSavedMoviesFiltered] = useState([])

    const [isShortMovie, setIsShortMovie] = useState(false)
    const [searchPhrase, setSearchPhrase] = useState('')


    const history = useHistory();

    const closeMenu = () => {
        setCloseMenu(false)
    }
    const openMenu = () => {
        setCloseMenu(true)
    }

    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt')

        if (!jwt) {
            return false;
        }
        getEmail(jwt)
            .then(data => {
                setCurrentUser(data[0])
                setIsLoggedIn(true);
            })
            .catch(err => {
                setIsLoggedIn(false);
                console.warn(err)
            });
    };

    useEffect(() => {
        console.log('!!')
        tokenCheck();
    }, [isLoggedIn]);

    const onRegister = (data) => {
        setMessage('')

        return register(data)
            .then(({token}) => {
                    localStorage.setItem('jwt', token)
                    setAuthSuccess(true)
                    setIsLoggedIn(true)
                }
            )
            .then(() => {
                history.push('/movies');
            }).catch(err => {
                console.log(err)
                if (err.status === 409) {
                    setMessage("Пользователь с таким email уже существует");
                } else {
                    setMessage("При регистрации пользователя произошла ошибка");
                }
            });
    };

    const onLogin = (data) => {
        setMessage('')

        return authorize(data)
            .then(({token}) => {
                localStorage.setItem('jwt', token);
                setIsLoggedIn(true);
                history.push("/movies");
            }).catch((err) => {
                if (err.status === 401) {
                    return setMessage("Неверный email или пароль");
                }
                setMessage("При авторизации произошла ошибка");
            });
    };

    function handleUpdateUser(data) {
        setMessage('')

        return apiMain.saveProfile(data, localStorage.getItem('jwt')).then((reqdata) => {
            console.log(reqdata)
            setCurrentUser({name: reqdata.name, email: reqdata.email})
        }).catch(err => {
            if (err.status === 409) {
                setMessage("Пользователь с таким email уже существует");
            } else {
                setMessage("При регистрации пользователя произошла ошибка");
            }
        })
    }

    const onLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
        history.push('/signin');
    };

    function handleShortMovie() {
        setIsShortMovie(!isShortMovie)
        console.log('!')
    }

    const filteredMovies = (moviesForFiltered) => {
        const filterByPhrase = moviesForFiltered.filter(movie => movie.nameRU.toLowerCase().trim().includes(searchPhrase.toLowerCase().trim()))
        console.log(searchPhrase, isShortMovie)
        if (!isShortMovie) {
            return filterByPhrase
        }
        return filterByPhrase.filter(movie => movie.duration < 41)
    }

    useEffect(() => {
        setAllMoviesFiltered(filteredMovies(allMoviesArray))
    }, [allMoviesArray])

    useEffect(() => {
        setSavedMoviesFiltered(filteredMovies(savedMoviesArray))
    }, [savedMoviesArray])

    const handleSubmitSearchForm = (e) => {
        e.preventDefault()
        setSavedMoviesFiltered(filteredMovies(savedMoviesArray))
    }

    const getAllMovies = async (e) => {
        e.preventDefault()
        try {
            setOpenPreloader(true)
            const movies = await apiMovies.getInitialCards()
            await localStorage.setItem('movies', JSON.stringify(movies))
            setAllMoviesArray(JSON.parse(localStorage.getItem('movies')))
            setOpenPreloader(false)

        } catch (error) {
            console.log(error)
        }
    }

    const getSavedMovies = async () => {
        try {
            localStorage.removeItem('savedMovies')

            const savedMovies = await apiMain.getSavedMovies(localStorage.getItem('jwt'))
            await localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
            setSavedMoviesArray(JSON.parse(localStorage.getItem('savedMovies')))
            console.log(savedMovies)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        try{
            getSavedMovies()
        }catch (error){
            console.log(error)
        }
    }, [currentUser])


    // useEffect(() => {
    //     setAllMoviesArray(JSON.parse(localStorage.getItem('movies')))
    // }, [])

    const likeMovie = async (movieData) => {
        try {
            await apiMain.likedMovie({...movieData}, localStorage.getItem('jwt'))
            await getSavedMovies()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteMovieFromSave = async (idCard) => {
        try {
            await apiMain.deleteMovie(idCard, localStorage.getItem('jwt'))
            await getSavedMovies()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>

                    <Route exact path="/">
                        <Header onOpen={openMenu} isLoggedIn={isLoggedIn} page={'main'}/>
                        <Main/>
                        <Footer/>
                    </Route>

                    <ProtectedRoute isOpenPreloader={isOpenPreloader} likedMovie={likeMovie} handleCheckbox={handleShortMovie}
                                    deleteMovie={deleteMovieFromSave}
                                    savedMovies={savedMoviesArray} filteredMovies={allMoviesFiltered}
                                    searchPhrase={searchPhrase} handleInput={setSearchPhrase}
                                    submitSearch={getAllMovies} onOpen={openMenu}
                                    isLoggedIn={isLoggedIn}
                                    path="/movies"
                                    component={Movies}>
                    </ProtectedRoute>

                    <ProtectedRoute isShortMovie={isShortMovie} handleCheckbox={handleShortMovie} likedMovie={likeMovie}
                                    filteredMovies={savedMoviesFiltered} component={SavedMovies}
                                    isLoggedIn={isLoggedIn} path="/saved-movies" searchPhrase={searchPhrase}
                                    handleInput={setSearchPhrase} onSubmitSearchForm={handleSubmitSearchForm}
                                    onOpen={openMenu} page={'saved-movies'} deleteMovie={deleteMovieFromSave}>
                    </ProtectedRoute>

                    <ProtectedRoute component={Profile} path="/profile" onOpen={openMenu} isLoggedIn={isLoggedIn}
                                    page={'profile'} onUpdateUser={handleUpdateUser} message={message}
                                    onLogout={onLogout}>
                    </ProtectedRoute>

                    <Route path="/signup">
                        <Register onRegister={onRegister} message={message}/>
                    </Route>

                    <Route path="/signin">
                        <Login onLogin={onLogin} message={message}/>
                    </Route>

                    <Route path="/*">
                        <NotFound/>
                    </Route>

                </Switch>
                {/*<Preloader isOpen={isOpenPreloader}/>*/}
                <Menu onClose={closeMenu} isClose={isCloseMenu}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
