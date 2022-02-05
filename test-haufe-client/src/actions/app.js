import {CHANGE_ROUTE} from "../constants/actions";

export const changeRoute = (payload) => ({
    type: CHANGE_ROUTE,
    payload: payload
});

export const onRouteInit = (path) => {
    console.log("route change");
    return (dispatch) => {
        dispatch(changeRoute(path))
    };
}