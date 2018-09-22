import React, { Component } from 'react'
import {PropTypes} from 'prop-types'

export class User extends Component {

    templates = () => {
        const {name, error, isFetching} = this.props;

        if(error){
            return <p>Произошла ошибка авторизации. Обновите страницу</p>
        }

        if(isFetching){
            return <p>Загрузка...</p>
        }

        if(name){
            return <p>Привет, {name}!</p>
        }
        else{
            return (
                <button className="btn" onClick={this.props.authorize}>Войти</button>
            )
        }
    }

    render() {
        return (
        <div className="ib user">{this.templates()}</div>
        )
    }
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired
}