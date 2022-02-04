import React from "react";
import Register from "../display/register";
import Dynamic from "../display/dynamic";

export default class Page extends React.Component {
    constructor(props) {
        super(props);

        this.views = {
            register: Register,
            dynamic: Dynamic
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