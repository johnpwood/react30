import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import days from '../days'

console.log(days)

class Header extends Component {
    render() {
        if (this.props.location.pathname !== '/') return (
            <div id="head">
                {days.map(x =>
                    <NavLink to={x[1].toLowerCase()}> {x[0].substr(0,2)} </NavLink>)}
            </div>
        )
        return ''
    }
}
export default Header
