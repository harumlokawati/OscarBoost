import React from 'react'
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router'
import {ConnectedRouter} from 'connected-react-router'
import App from './pages/App'
import Main from './pages/Main'

export default (store, history) => {
    const routes = () => {
        return <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <App>
                        <Route path='/' component={Main}/>
                    </App>
                </Switch>
            </ConnectedRouter>
        </Provider>
    }

    return routes
}