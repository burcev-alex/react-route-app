import React, { Component } from 'react'
import FormAuth from './components/FormAuth'
import Tables from './components/Tables'

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            'items' : []
        }
    }

    handleAddState = (login, pass) => {
        const {items} = this.state;

        items.push({ 'name': login, 'pass':pass});
        this.setState({items: items});
    }

    render() {
        const {items} = this.state;
        return (
            <React.Fragment>
                <FormAuth onSubmit={this.handleAddState}/>
                <Tables items={items}/>
            </React.Fragment>
        );
    }
  }
export default App;