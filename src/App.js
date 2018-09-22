import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Article extends Component {
    constructor(props){
        super(props);

        this.state = {
            visible: false
        }
    }

    handleReadMoreClck = (e) => {
        e.preventDefault()
        this.setState({ visible: true })
      }

    render() {
        const { info } = this.props
        const { visible } = this.state;

        return (
            <div className="article">
                <p className="news__author">{info.author}</p>
                <p className="news__text">{info.text}</p>
                {!visible ? <a onClick={this.handleReadMoreClck} href="#" className='news__readmore'>Подробнее</a> : null}
                {visible ? <p className="news__big-text">{info.bigText}</p> : null}
            </div>
        );
    }
}

Article.propTypes = {
    info: PropTypes.shape({
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        bigText: PropTypes.string.isRequired
    })
}


class News extends Component {
    state = {
        counter: 0
    }

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

    handleCounter = (e) => {
        e.preventDefault();

        this.setState({counter : ++this.state.counter});
    }

    render() {
        const newsContent = this.getContentList(this.props.data);
        return (
            <div className="news">
                {newsContent}
                {
                    this.props.data.length>0 ? <strong onClick={this.handleCounter} className={'news__count'}>Всего новостей: {this.props.data.length}</strong> : null
                }
                <p>Всего кликов: { this.state.counter }</p>
            </div>
        );
    }
}

News.propTypes = {
    data: PropTypes.array.isRequired
}

class Add extends Component {
    constructor(props){
        super(props);

        this.author = React.createRef();
        this.text = React.createRef();
        this.role = React.createRef();
    }

    componentDidMount(){
        this.author.current.focus();
    }

    onBtnClickHandler = () => {
        alert(this.author.current.value);
    }

    render() {
        return (
            <React.Fragment>
                <form className='add'>
                    <input
                    type='text'
                    ref={this.author}
                    className='add__author'
                    placeholder='Ваше имя'
                    />
                    <textarea 
                    ref={this.text}
                    className='add__text'
                    placeholder='Текст новости'
                    ></textarea>
                    <label className='add__checkrule'>
                    <input type='checkbox' ref={this.rule} /> Я согласен с правилами
                    </label>
                    <button
                    className='add__btn'
                    onClick={this.onBtnClickHandler}>
                    Показать alert
                    </button>
                </form>
            </React.Fragment>
        );
    }
}



class App extends Component {
    state = {
        items: null,
        isLoading: false,
    }
    static getDerivedStateFromProps(props, state) {
        let nextFilteredNews
    
        // смотрим в state.news (ранее смотрели в props)
        // и проверяем, чтобы не клоинировать null
        // например, в момент первой отрисовки
        if (Array.isArray(state.news)) {
          nextFilteredNews = [...state.news]
    
          nextFilteredNews.forEach((item, index) => {
            if (item.bigText.toLowerCase().indexOf('pubg') !== -1) {
              item.bigText = 'СПАМ'
            }
          })
    
          return {
            filteredNews: nextFilteredNews,
          }
        }
    
        return null
    }
    componentDidMount() {
        this.setState({ isLoading: true });

        const myHeaders = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        fetch('http://localhost:3002/data/newsData.json', {headers: myHeaders})
        .then(response => {
            return response.json();
        })
        .then(data => {
            setTimeout(() => {
                this.setState({ isLoading: false, items: data })
            }, 1000) // изменил таймер на 1000, чтобы не ждать долго
        })
    }
    render() {
        const { items, isLoading } = this.state;

        return (
            <React.Fragment>
                <h2>Новости</h2>
                <Add />
                {isLoading && <p>Загружаю...</p>}
                {Array.isArray(items) && <News data={items} />}
            </React.Fragment>
        );
    }
  }
export default App;