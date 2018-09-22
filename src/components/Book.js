import React from 'react'
import Replay from 'material-ui-icons/Replay'
import {BookInfo} from './BookInfo'
import { httpGet } from '../helpers/network'

export class Book extends React.Component {
    state = {
        data: [],
        isLoading: false,
        error: false
    }
    
    componentDidMount(){
        this.loadData();
    }

    loadData(){
        const epicName = this.props.match.path.split('/')[2];

        this.setState({isLoading: true});

        httpGet(epicName).then(json => this.setState({data:json.books, isLoading: false})).catch(e => this.setState({error:true, isLoading:false}));
    }

    renderTemplate = () => {
        const {isLoading, data, error} = this.state;

        if(error){
            return (
                <React.Fragment>
                    <p>
                        Произошла ошибка ... {' '}
                        <Replay style={{cursor:'pointer'}} onClick={this.loadData} />
                    </p>
                </React.Fragment>
            )
        }
        
        if(isLoading){
            return <p>Загрузка...</p>
        }
        else{
            return data.map((item, index) => {
                return <BookInfo key={index} data={item} />
            });
        }
    }

    render() {
        const {match} = this.props;
        
        return (
            <div>{this.renderTemplate()}</div>
        );
    }
}

