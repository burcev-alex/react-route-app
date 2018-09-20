import React, { Component } from 'react'

class FormAuth extends Component {
    constructor (props){
        super(props);

        this.state = {
            loginName: '',
            password: null
        }
    }

    handleChangeInput = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = () => {

        const {onSubmit} = this.props;
        const {loginName, passWord} = this.state;

        onSubmit(loginName, passWord);
    }
  
    render() {
        const {loginName, passWord} = this.state;
        
        return (
            <form>
                <label>Логин:</label>
                <input type="text" name="loginName" value={loginName || ''} onChange={this.handleChangeInput} /><br/>
                <label>Пароль:</label>
                <input type="password" name="passWord" value={passWord || ''} onChange={this.handleChangeInput} /><br/>
                <input type="button" value="Отправить" onClick={this.handleSubmit} />
            </form>
        );
    }
  }
  
export default FormAuth;