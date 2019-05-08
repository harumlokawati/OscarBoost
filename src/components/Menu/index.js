import React, {Component} from 'react'
import './menu.css'

class Menu extends Component {
    render() {
        // var image = this.props.image
        return (

            <div className='sidebar-menu'>
                <p className='menu'>
                    <img src={require(this.props.image)} className='image-menu'/>
                    {this.props.text}
                </p>
            </div>
        )
    }
}

export default Menu