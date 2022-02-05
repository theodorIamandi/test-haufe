import {BrowserRouter as Router, Route, Routes, Switch} from "react-router-dom";
import Container from "./views/container";
import {routes} from "./constants/routes";

function App() {
    return (
        <AppRouting />
    );
}

function AppRouting() {
    return (
        <Router>
            <Routing />
        </Router> );
}

function Routing(props) {
    return (
        <Switch>
            {routes.map((entry, i) => {
                return (
                    <Route
                        key={entry.id}
                        exact={entry.exact}
                        path={entry.path}
                        render={(params) =>
                            <RouteComponent
                                item={entry}
                                params={params} />
                        }

                    /> );
            })}
        </Switch>
    );
}

function RouteComponent(props) {
    return (
        <Container
            template={props.item.template}
            params={props.params}
            identifier={props.item.id} /> );
}

export default App;
