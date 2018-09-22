import React from 'react'
import {PropTypes} from 'prop-types'

export class Page extends React.Component {

    onBtnClick = e => {
        const year = +e.currentTarget.innerText;
        this.props.getPhotos(year);
    }

    renderTemplate = () => {
        const {photos, error, isFetching} = this.props;

        if(error){
            return <p className="error">Во время загрузки фото произошла ошибка</p>
        }

        if(isFetching){
            return <p>Загрузка...</p>
        }
        else{
            return photos.map(items => {
                return (<div key={items.id} className="photo">
                    <p>
                        <img src={items.sizes[0].url} alt="" />
                    </p>
                    <p>{items.likes.count} ❤</p>
                </div>)
            });
        }
    }

    render() {

        const {year, photos} = this.props;

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
            <h3>{year} год [{photos.length}]</h3>
            {this.renderTemplate()}
        </div>
        )
    }
}

Page.propTypes = {
    year: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
    getPhotos: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired
}