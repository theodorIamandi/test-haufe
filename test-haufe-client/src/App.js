import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
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
        <Routes>
            {routes.map((entry, i) => {
                return (
                    <Route
                        key={entry.id}
                        exact={entry.exact}
                        path={entry.path}
                        element={<RouteComponent item={entry} /> } /> );
            })}
        </Routes>
    );
}

function RouteComponent(props) {
    return (
        <Container
            template={props.item.template}
            identifier={props.item.id} /> );
}

export default App;
