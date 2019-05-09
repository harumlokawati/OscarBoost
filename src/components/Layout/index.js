import React, { Component } from 'react'
import './layout.css'
class Layout extends Component {
    render() {
        return (
            <div>
                <div className="dashboard-container">
                    <img src={require('../../assets/image/oscar.png')} className='oscar-art'/>
                    <img src={require('../../assets/image/Popcorn.png')} className='popcorn'/>
                    {/*<img src={art} className='art'/>*/}
                    {this.props.children}

                </div>
            </div>
        )
    }
}

export default Layout