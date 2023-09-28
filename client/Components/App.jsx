import React, { useEffect } from "react";
import SignUp from "./Signup.jsx";
import LoginBox from "./Login.jsx";
import MainPage from "./Mainpage.jsx"
import { Route, Routes } from 'react-router-dom';
import '../styles.scss';

const App = () => {



    return (
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<LoginBox />} />
            <Route path ='/main' element = {<MainPage />} />
        </Routes>
    )
}

export default App;