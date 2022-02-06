import React from "react";
import Register from "../display/register";
import Main from "../display/main";

export default class Page extends React.Component {
    constructor(props) {
        super(props);

        this.views = {
            register: Register,
            main: Main
        };
    }

    render() {
        let Display = this.views[this.props.identifier]
        return (
            <div className={""}>
                <Display />
            </div>
        );
    }
}