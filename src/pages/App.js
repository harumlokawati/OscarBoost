import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'

import Layout from '../components/Layout'
import './app.css'

class App extends Component {
    render() {
        return <Layout children={this.props.children}/>
    }
}

export default hot(App)
