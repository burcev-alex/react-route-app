import React from 'react'
import {PropTypes} from 'prop-types'

export class Page extends React.Component {

    onBtnClick = e => {
        const year = +e.currentTarget.innerText;
        this.props.getPhotos(year);
    }

    render() {
        const {photos, year, isFetching} = this.props;

        const informationPhotos = !isFetching ? <p>У тебя {photos.length} фото</p> : 'Загрузка...';

        return (
        <div className="ib page">
            <p>
                <button className="btn" onClick={this.onBtnClick}>2018</button>{' '}
                <button className="btn" onClick={this.onBtnClick}>2017</button>{' '}
                <button className="btn" onClick={this.onBtnClick}>2016</button>{' '}
                <button className="btn" onClick={this.onBtnClick}>2015</button>{' '}
                <button className="btn" onClick={this.onBtnClick}>2014</button>{' '}
                <button className="btn" onClick={this.onBtnClick}>2013</button>{' '}
                <button className="btn" onClick={this.onBtnClick}>2012</button>{' '}
                <button className="btn" onClick={this.onBtnClick}>2011</button>
            </p>
            <h3>{year} год</h3>
            {informationPhotos}
        </div>
        )
    }
}

Page.propTypes = {
    year: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
    getPhotos: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
}