import React from "react";
import {connect} from "react-redux";
import {templates} from "./templates";

class Container extends React.Component {
    render() {
        let Template = templates[this.props.template]

        return (
            <ContainerView
                location={this.props.location}>
                <Template identifier={this.props.identifier} />
            </ContainerView>
        );
    }
}

class ContainerView extends React.Component {
    render() {
        return (
            <div className="flex">
                <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-hidden">
                    <main
                        className={"lg:px-24 px-12"}>
                        {this.props.children}
                    </main>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    app: state.app
});

export default connect(mapStateToProps)(Container)