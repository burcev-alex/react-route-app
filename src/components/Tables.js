import React, { Component } from 'react'

class Tables extends Component {
    constructor (props){
        super(props);

        this.state = {
            loginName: '',
            password: null
        }
    }
  
    render() {
        const {items} = this.props;
        let counts = items.length || 0;

        return (
            <table>
                <thead>
                    <tr>
                        <th>Login</th>
                        <th>Pass</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.pass}</td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td><b>ИТОГО:</b></td>
                        <td>{counts}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
  }
  
export default Tables;