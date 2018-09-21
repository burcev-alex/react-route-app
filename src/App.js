import React, { Component } from 'react'
import PropTypes from 'prop-types';

const items = [
    {
        id: 1,
        author: 'Sasha Burcev',
        text: '23.08.2018 21:00 — Презентация обновленного руководства по Redux + разбор финального примера.'
    },
    {
        id: 2,
        author: 'Вася Пушкин',
        text: '21.08.2018 21:00 — Презентация обновленного руководства по Redux + разбор финального примера.'
    },
    {
        id: 3,
        author: 'Sasha Попов',
        text: '23.11.2011 21:00 — Презентация обновленного руководства по Redux + разбор финального примера.'
    },
    {
        id: 4,
        author: 'Игнат Burcev',
        text: '22.08.2013 21:00 — Презентация обновленного руководства по Redux + разбор финального примера.'
    }
]

class Article extends Component {
    render() {
        const {info} = this.props
        return (
            <div className="article">
                <p className="news_author">{info.author}</p>
                <p className="news_author">{info.text}</p>
            </div>
        );
    }
}

Article.propTypes = {
    info: PropTypes.shape({
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })
}


class News extends Component {
    getContentList(lists){
        let content = lists.map(function(info, index){
            return (
                <Article key={info.id} info={info}/>
            )
        });

        if(lists.length > 0){
            return content;
        }
        else{
            return (<p>Новостей нет</p>)
        }
    }

    render() {
        const newsContent = this.getContentList(this.props.data);
        return (
            <div className="news">
                {newsContent}
                {
                    this.props.data.length>0 ? <strong className={'news__count'}>Всего новостей: {this.props.data.length}</strong> : null
                }
            </div>
        );
    }
}

News.propTypes = {
    data: PropTypes.array.isRequired
}


class App extends Component {
    render() {
        return (
            <React.Fragment>
                <h2>Новости</h2>
                <News data={items}/>
            </React.Fragment>
        );
    }
  }
export default App;