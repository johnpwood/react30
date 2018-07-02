fs = require('fs')
watch = require('node-watch') // fs.watch doesn't work on Linux!!!!!!!??????
const { Builder } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')
const path = 'src/JavaScript30/'
//const url = 'http://www.johnwood.io/React30/'
const url = 'http://localhost:3000/'

const driver = new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(new firefox.Options().headless().windowSize({ width: 640, height: 480 }))
    .build()


watch('src/JavaScript30', { recursive: true }, (evt, filename) => {
    files = fs.readdirSync(path)
    files = files.filter(x => {
        f2 = fs.readdirSync(path + x)
        return f2.filter(y => y === 'a.js').length > 0
    })
    components = files.map(x => [x, x.replace(/ /g, '').substr(3)])
    console.log(components)

    fs.writeFileSync('./src/days.js', 'export default ' + JSON.stringify(components))

    components.forEach(x => {
        driver.get(url + x[1]).then(() => {
            driver.takeScreenshot().then(data => {
                fs.writeFileSync('./public/thumbs/' + x[1] + '.png', data, 'base64')
            })
        })
    })

    const app =
        `import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link, NavLink } from 'react-router-dom'
import Header from './components/Header'
import Calendar from './components/Calendar'
${components.map(x => 'import ' + x[1] + ' from ' + '\'' + './JavaScript30/' + x[0] + '/a.js' + '\'')}

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" component={Header} exact={false} />
                    <Switch>
                        <Route path="/" component={Calendar} exact={true} />
                        ${components.map(x => '<Route path="/' + x[1].toLowerCase() + '" component={' + x[1] + '} />')}
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App
`
    fs.writeFileSync('src/App.js', app)

})