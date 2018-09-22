import React, { Component } from 'react'
import {Route, Link} from '../components/Router'
import {Epic} from '../components/Epic'

const Home = () => <h2>Home</h2>
const About = () => <h2>Author Burcev Alexander</h2>


class App extends Component {
    render() {
        return (
        <div>
            <ul>
                <li>
                    <Link to="/">Главная</Link>
                </li>
                <li>
                    <Link to="/epic">Эпопея</Link>
                </li>
                <li>
                    <Link to="/about">о преложении</Link>
                </li>
            </ul>

            <hr/>

            <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/epic" component={Epic}/>
                <Route path="/about" component={About}/>
            </div>
        </div>
        )
    }
}


export default App;