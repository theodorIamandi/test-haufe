import React from "react";
import Login from "../display/login";
import Register from "../display/register";

export default class Authentication extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: 'login'
        };

        this.display = {
            login: Login,
            register: Register
        };
    }

    changeDisplay = (type) => {
        this.setState({display: type});
    }

    render() {
        let Component = this.display[this.state.display];
        return (
            <React.Fragment>
                <Component
                    changeDisplay={this.changeDisplay} />
            </React.Fragment>
        );
    }
}