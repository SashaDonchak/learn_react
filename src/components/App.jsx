import React, { Component } from 'react'
import Articles from './routes/Articles'
import Counter from './Counter'
import Filter from './Filter'
import Comments from './routes/Comments'
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom'


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h1>Hello, World!</h1>
                    <div>
                        <h2>Main menu</h2>
                        <div>
                            <NavLink activeStyle = {{color: 'red'}} to="/counter">Counter</NavLink>
                            <NavLink activeStyle = {{color: 'red'}} to="/filter">Filters</NavLink>
                            <NavLink activeStyle = {{color: 'red'}} to="/articles">Articles</NavLink>
                            <NavLink activeStyle = {{color: 'red'}} to="/comments">Comments</NavLink>
                        </div>
                    </div>
                    <Switch>
                        <Route path = "/counter" component = {Counter} />
                        <Route path = "/filter" component = {Filter} />
                        <Route path = "/articles" component = {Articles} />
                        <Route path = "/comments" component = {Comments} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App