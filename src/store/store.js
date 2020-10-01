import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import rootReducers from 'store/reducers/AdminReducers';
import rootReducers from 'store/reducers';

// console.log('rootReducers', rootReducers)
// redux-persist
// React Redux Router
// eslint-disable-next-line
import { connectRouter, routerMiddleware } from 'connected-react-router';
import history from './history';

// const createHistory = require("history").createBrowserHistory;
// // const createHistory = require("history").createHashHistory
// export const history = createHistory();

// End React Redux Router

const initialState = {};

//   const customMiddleWare = store => next => action => {
//     console.log("Middleware triggered:", action);
//     next(action);
//   };


const middleware = [
    thunk,
    routerMiddleware(history),
    // customMiddleWare

];
const composedEnhancers = compose(
    applyMiddleware(...middleware),
    process.env.NODE_ENV === 'development' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : a => a
);
// eslint-disable-next-line
const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    ...rootReducers
});;

const store = createStore(
    // connectRouter(history)(rootReducer),
    rootReducer(history),
    initialState,
    composedEnhancers
);

export default store;
