import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import './sidebar.css'

import React, {Component} from 'react'

class Table extends Component {

    render() {
        return (
            <div className='wrapper'>
                <nav className='sidebar' role='navigation'>
                    <div className='sidebar-content'>
                        <img src={require('../../assets/image/logo.png')} className='logo'/>
                        <NavLink activeClassName='active' to='/tenant'>
                            <div className='sidebar-menu'>
                                <p className='menu'>
                                    <img src={require('../../assets/image/tenant.png')} className='image-menu'/>
                                    Tenant
                                </p>
                            </div>
                        </NavLink>
                        <NavLink activeClassName='active' to='/service'>
                            <div className='sidebar-menu'>
                                <p className='menu'>
                                    <img src={require('../../assets/image/service.png')} className='image-menu'/>
                                    Service
                                </p>
                            </div>
                        </NavLink>
                        <NavLink activeClassName='active' to='/resource'>
                            <div className='sidebar-menu'>
                                <p className='menu'>
                                    <img src={require('../../assets/image/resource.png')} className='image-menu'/>
                                    Resource
                                </p>
                            </div>
                        </NavLink>
                    </div>
                </nav>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {dispatch}
}

export default connect(null, mapDispatchToProps)(Table)