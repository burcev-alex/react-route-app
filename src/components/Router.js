import React from 'react'
import PropTypes from 'prop-types'

let instances = [];

const register = comp => instances.push(comp);
const unregister = comp => instances.splice(instances.indexOf(comp), 1);

const matchPath = (pathname, options) => {
    const { exact = false, path } = options // "вытаскиваем" из props нужные свойства, по умолчанию exact = false
  
    if (!path) { // если свойства path нет
      return { // устанавливаются следующие значения
        path: null,
        url: pathname,
        isExact: true, 
      }
    }
  
    const match = new RegExp(`^${path}`).exec(pathname) // с помощью регулярного выражения получаем массив строк
  
    if (!match) { // если совпадений не найдено, из функции matchParams возвращается null
      return null
    }
  
    const url = match[0] // если совпадение нашлось, берем из массива первое значение (массив, потому что, так работает RexExp метод exec)
    const isExact = pathname === url // создаем переменную isExact равную true / false
  
    if (exact && !isExact) {
      // совпадение нашлось, но в свойствах было указано exact, а в данный момент pathname не равно url (следовательно, isExact - false)
      // поэтому тоже возвращаем null, так как совпадение не точное
  
      return null
    }
  
    return { // все в порядке, из функции возвращается объект с полезными свойствами 
      path,
      url,
      isExact,
    }
}

export class Route extends React.Component {
    static propTypes = {
        path: PropTypes.string,
        exact: PropTypes.bool,
        component: PropTypes.func,
        render: PropTypes.func
    }

    componentWillMount(){
        window.addEventListener('popstate', this.handlePop);
        register(this);
    }

    componentWillUnmount(){
        window.removeEventListener('popstate', this.handlePop);
        unregister(this);
    }

    handlePop = () => {
        this.forceUpdate();
    }

    render() {
        const {path, exact, component, render} = this.props;

        const match = matchPath(window.location.pathname, {path, exact});
        if(!match) return null;

        if(component) return React.createElement(component, { match });

        if(render) return render();

        return null;
    }
}

const historyPush = path => {
    window.history.pushState({}, null, path);
    instances.forEach(instance => instance.forceUpdate())
}

const replaceHistoryPath = path => {
    window.history.replaceState({}, null, path);
    instances.forEach(instance => instance.forceUpdate())
}

export class Link extends React.Component {
    static propTypes = {
        to: PropTypes.string.isRequired,
        replace: PropTypes.bool
    }

    handleClick = (event) => {
        const {replace, to} = this.props;

        console.info(this.props);
        event.preventDefault();

        replace ? replaceHistoryPath(to) : historyPush(to);
    }
    render() {
        const {to, children} = this.props;

        return (
            <a href={to} onClick={this.handleClick}>
                {children}
            </a>
        );
    }
}