import React, { Component } from 'react'
import './layout.css'
class Layout extends Component {
    render() {
        let imgUrl = require('../../assets/image/Background.jpg')
        return (
            <div style = {{ backgroundImage: 'url(' + imgUrl + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
            }}>

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