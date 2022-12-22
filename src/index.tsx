import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import "react-datepicker/dist/react-datepicker.css";
import './styles/index.scss';
import configureStore from './config/configStore';
import Layouts from "./config/Layout";
import {ToastContainer} from "react-toastify";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fab, fas)

// Initialize store
export const store = configureStore();
let apiCounter = 0;
axios.interceptors.request.use(
    function(config) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        apiCounter++;
        document.body.classList.add("api-loading");
        if (store.getState().configReducer && store.getState().config.token)
            config.headers.Authorization = `Bearer ${store.getState().config.token}`;
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function(response) {
        apiCounter--;
        if (apiCounter == 0) {
            document.body.classList.remove("api-loading");
        }
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Layouts />
                <ToastContainer
                    // autoClose={15000}
                />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);