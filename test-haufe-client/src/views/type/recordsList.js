import React from 'react';
import {connect} from "react-redux";
import {deleteXHR, getXHR, postXHR} from "../../util/functions";
import {getPersistentTokens, getTokenAuth} from "../../actions/app";
import Forbidden from "./forbidden";
import Create from "../display/create";
import {entityParams} from "../../constants/params";

class RecordsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            renderCreate: true
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.params.entity !== prevProps.params.entity)
            this.fetchData();
    }

    fetchData = () => {
        let persistent = getPersistentTokens()
        getXHR({
                auth: getTokenAuth(persistent.token, persistent.jwt),
                data: entityParams[this.props.params.entity],
                action: "/api/v1/" + this.props.params.entity
            }, (res) => { this.setState({list: res}) })
    }

    fetchPhoto = (search, callback) => {
        fetch("https://api.unsplash.com/search/photos?query="+ search +"&client_id=D76qtmIp6VLtLLmUYRFe7kEqhZfTZrHuG5ya4u48WoY", )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                callback(data);
            })
            .catch((error) => {

            });
    }

    create = (data) => {
        let persistent = getPersistentTokens()
        this.fetchPhoto(data.name.split(" ")[0], (resp) => {
            postXHR({
                auth: getTokenAuth(persistent.token, persistent.jwt),
                action: '/api/v1/' + this.props.params.entity,
                data: { ...data, image: resp.results[0].urls.regular }
            },(res) => {
                this.setState({renderCreate: false}, () => {
                    this.setState({renderCreate: true})
                    this.fetchData();
                })
            },
            (err) => {})
        })
    }

    remove = (entity, id) => {
        let persistent = getPersistentTokens()
        deleteXHR({
                auth: getTokenAuth(persistent.token, persistent.jwt),
                action: '/api/v1/' + this.props.params.entity + "/" + id,
                data: {}
            },(res) => { this.fetchData(); },
            (err) => {})
    }

    render() {
        if(this.props.app.acl === null)
            return ( null );

        if(this.props.app.acl[this.props.params.entity].indexOf("read") === -1)
            return ( <Forbidden /> );
        return (
            <React.Fragment>
                {this.props.app.acl[this.props.params.entity].indexOf("create") !== -1 && this.state.renderCreate ? (

                    <Create
                        entity={this.props.params.entity}
                        create={(data) => { this.create(data) }} />
                ) : null}

                <div>
                    {this.state.list.map((item, i) => {
                        return (
                            <div key={i} className={"flex flex-row items-center my-12"}>
                                <div className={"flex-grow"}>
                                    {item.name}
                                </div>
                                <div>
                                    <img alt={""} src={item.image} width={35} />
                                </div>
                                <div className={"flex-shrink  px-12 border-l"}>
                                    {this.props.app.acl[this.props.params.entity].indexOf("delete") !== -1 ? (

                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();

                                            this.remove('user', item.id);
                                        }}>Delete</button>
                                    ) : null}

                                </div>
                            </div>
                        );
                    })}
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    app: state.app
});

export default connect(mapStateToProps)(RecordsList)