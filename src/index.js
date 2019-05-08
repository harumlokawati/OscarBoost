import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, combineReducers} from "redux"
import {composeWithDevTools} from 'redux-devtools-extension'
import {routerReducer} from 'react-router-redux'
import {connectRouter} from 'connected-react-router'
import {createBrowserHistory} from "history"
import createSagaMiddleware from 'redux-saga'
import Routes from './routes'
import {reducer as mainReducer} from 'reducers/main'
import mainSaga from 'sagas/main'
import thunk from 'redux-thunk'

const history = createBrowserHistory()

const reducer = {
    resource: mainReducer,
    routing: routerReducer,
    router: connectRouter(history)
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    combineReducers(reducer),
    composeWithDevTools(
        applyMiddleware(sagaMiddleware),
        applyMiddleware(thunk)
    )
)

sagaMiddleware.run(mainSaga)

const App = Routes(store, history)
ReactDOM.render(<App/>, document.getElementById('root'))