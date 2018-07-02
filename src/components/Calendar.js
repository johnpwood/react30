import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import days from '../days'

class Calendar extends Component {
    render(){
        return (
            <div id="calendar">
                {days.map(x => 
                    <Link class="calendar-day" to={x[1].toLowerCase()} >
                        <img src={'thumbs/' + x[1] + '.png'}
                             style={{
                                 width:'8vw',
                                 height:'6vw'
                             }}></img>

                        <span>{x[0]}</span></Link>
                )}
            </div>
        )
    }
}
export default Calendar