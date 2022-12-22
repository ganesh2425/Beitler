import React from 'react';
// import {useDispatch} from "react-redux";
import Login from "../components/Login";
// import { setLoggedAction } from "../actions/authActions";
// import { useHistory } from 'react-router-dom';
import '../styles/pages/_login.scss'

const LoginContainer = ():JSX.Element => {
    return (
        <div className={'container-fluid'}>
            <Login />
        </div>
    );
}

export default LoginContainer;