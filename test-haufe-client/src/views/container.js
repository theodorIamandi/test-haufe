import React from "react";
import {connect} from "react-redux";
import {templates} from "./type";
import Header from "./components/header";
import {onRouteInit} from "../actions/app";
import Authentication from "./type/authentication";

class Container extends React.Component {
    componentDidMount() {
        this.routeInit(this.props.params.location.pathname)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.params.location.pathname !== prevProps.params.location.pathname)
            this.routeInit(this.props.params.location.pathname)
    }

    routeInit = (path) => {
        this.props.dispatch(onRouteInit(path));
    }

    render() {
        let Template = templates[this.props.template]

        return ( <Authentication /> );

        return (
            <ContainerView
                location={this.props.location}>
                Template identifier={this.props.identifier} />
            </ContainerView>
        );
    }
}

class ContainerView extends React.Component {
    render() {
        return (
            <div className="flex">
                <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-hidden">
                    <Header />
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