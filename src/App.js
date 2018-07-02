import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link, NavLink } from 'react-router-dom'
import Header from './components/Header'
import Calendar from './components/Calendar'
import JavaScriptDrumKit from './JavaScript30/01 - JavaScript Drum Kit/a.js'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" component={Header} exact={false} />
                    <Switch>
                        <Route path="/" component={Calendar} exact={true} />
                        <Route path="/javascriptdrumkit" component={JavaScriptDrumKit} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App
