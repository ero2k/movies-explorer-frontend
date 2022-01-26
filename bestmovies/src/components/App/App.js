import React from "react";
import "../../index.css"
import "./App.css"
import Main from "../Main/Main"
import Header from "../Header/Header"
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Preloader from "../Preloader/Preloader";
import {Route, Switch} from 'react-router-dom';
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Menu from "../Menu/Menu";
import { useState, useEffect } from 'react';


function App() {
    const [isCloseMenu, setCloseMenu] = React.useState(false)
    const [isOpenPreloader, setOpenPreloader] = React.useState(false)

    // function getWindowDimensions() {
    //     const { innerWidth: width} = window;
    //     return {
    //         width
    //     };
    // }
    //
    // function useWindowDimensions() {
    //     const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    //     useEffect(() => {
    //         function handleResize() {
    //             setWindowDimensions(getWindowDimensions());
    //         }
    //         window.addEventListener('resize', handleResize);
    //         return () => window.removeEventListener('resize', handleResize);
    //     }, []);
    //     return windowDimensions;
    // }


    const closeMenu = () => {
        setCloseMenu(false)
    }
    const openMenu = () => {
        setCloseMenu(true)
    }


    return (
        <div className="page">
            <Header onOpen={openMenu}/>
            <Switch>
                <Route exact path="/">
                    <Main/>
                </Route>
                <Route path="/movies">
                    {/*<Movies size={useWindowDimensions()}/>*/}
                    <Movies/>
                </Route>
                <Route path="/saved-movies">
                    <SavedMovies/>
                </Route>
                <Route path="/profile">
                    <Profile/>
                </Route>
                <Route path="/signup">
                    <Register/>
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
