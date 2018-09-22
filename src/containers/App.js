import React, { Component } from 'react'
import {connect} from 'react-redux'
import {User} from '../components/User'
import {Page} from '../components/Page'
import {getPhotos} from '../actions/PageActions'
import {authorize} from '../actions/UserActions'

class App extends Component {
    render() {
        const {user, page, getPhotos, authorize} = this.props;

        return (
        <div className="App">
            <header className="App-header">
            <h1 className="App-title">Мои фото</h1>
            </header>
            <User name={user.name} error={user.error} authorize={authorize} isFetching={page.isFetching}/>
            <Page photos={page.photos} year={page.year} getPhotos={getPhotos} isFetching={page.isFetching} />
        </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.user,
        page: store.page
    }
}

const mapDispatchProps = dispatch => {
    return {
        getPhotos: year => dispatch(getPhotos(year)),
        authorize: () => dispatch(authorize()),
    }
}

export default connect(mapStateToProps, mapDispatchProps)(App);