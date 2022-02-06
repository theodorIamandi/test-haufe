import React from "react";
import {connect} from "react-redux";
import {templates} from "./type";
import Header from "./components/header";
import {checkApi, onRouteInit} from "../actions/app";
import Authentication from "./type/authentication";

class Container extends React.Component {
    componentDidMount() {
        this.routeInit(this.props.params.location.pathname);
        if(!this.props.app.isInitialized)
            this.props.dispatch(checkApi(this.props.app.isInitialized));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.params.location.pathname !== prevProps.params.location.pathname)
            this.routeInit(this.props.params.location.pathname)
    }

    routeInit = (path) => {
        this.props.dispatch(onRouteInit(path));
    }

    render() {
        if(!this.props.app.render.app && !this.props.app.render.authentication)
            return null;

        if(this.props.app.render.authentication)
            return ( <Authentication /> );

        let Template = templates[this.props.template]

        return (
            <ContainerView
                location={this.props.location}>
                <Template
                    params={this.props.params.match.params}
                    identifier={this.props.identifier} />
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