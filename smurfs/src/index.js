import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
// redux boilerplate
import {createStore, applyMiddleware} from 'redux';

import {Provider} from 'react-redux';
// reducer
import SmurfReducer from './reducers';
// import Thunk
import Thunk from 'redux-thunk';

const logger = ({getState}) => next => action => {
    console.log("Dispatching: ", action);
    next(action);
};
const store = createStore(SmurfReducer, applyMiddleware(logger, Thunk))

ReactDOM.render(
    <Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));