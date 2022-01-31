import React from "react";
import "../../index.css"
import "./App.css"
import Main from "../Main/Main"
import Header from "../Header/Header"
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Preloader from "../Preloader/Preloader";
import {Route, Switch, useHistory} from 'react-router-dom';
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Menu from "../Menu/Menu";
import { useState, useEffect } from 'react';
import {register, test} from "../../utils/authApi";



function App() {
    const [isCloseMenu, setCloseMenu] = useState(false)
    const [isOpenPreloader, setOpenPreloader] = useState(false)
    const [authSuccess,setAuthSuccess] = useState(false)

    const history = useHistory();

    const closeMenu = () => {
        setCloseMenu(false)
    }
    const openMenu = () => {
        setCloseMenu(true)
    }

    // const onRegister =  (data) => {
    //     return register(data)
    //         .then(() =>
    //             setAuthSuccess(true)
    //         )
    //         .then(() => {
    //             history.push('/signin');
    //         }).catch(err => {
    //             console.warn(err)
    //             setAuthSuccess(false)
    //         });
    // };
    const onRegister =  (data) => {
        return test()
            .then((data) =>
                console.log(data)
            )
            .then(() => {
            }).catch(err => {
                console.warn(err)
                setAuthSuccess(false)
            });
    };


    // const onRegister = async (data) => {
    //     return register(data)
    //         .then(() =>
    //             setAuthSuccess(true)
    //         )
    //         .then(() => setInfoTooltipOpen(true))
    //         .then(() => {
    //             history.push('/signin');
    //         }).catch(err => {
    //             console.warn(err)
    //             setAuthSuccess(false)
    //             setInfoTooltipOpen(true)
    //         });
    // };

    return (
        <div className="page">
            <Header onOpen={openMenu}/>
            <Switch>
                <Route exact path="/">
                    <Main/>
                </Route>
                <Route path="/movies">
                    <Movies/>
                </Route>
                <Route path="/saved-movies">
                    <SavedMovies/>
                </Route>
                <Route path="/profile">
                    <Profile/>
                </Route>
                <Route path="/signup">
                    <Register onRegister={onRegister}/>
                </Route>
                <Route path="/signin">
                    <Login/>
                </Route>
                <Route path="/*">
                    <NotFound/>
                </Route>
            </Switch>
            <Preloader isOpen={isOpenPreloader}/>
            <Menu onClose={closeMenu} isClose={isCloseMenu}/>
            <Footer/>
        </div>
    );
}

export default App;
