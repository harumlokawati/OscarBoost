import React, { Component } from 'react'
import './layout.css'

class Layout extends Component {
    render() {
        return (
            <div>
                <div className="dashboard-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Layout