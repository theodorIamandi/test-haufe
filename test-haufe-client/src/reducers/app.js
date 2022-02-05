import {CHECK_API_HEALTH, HANDLE_APP_RENDER, HANDLE_USER_STATE, LOGOUT, ROUTE_INIT} from "../constants/actions";

const initialState = {
    checkedUser: false,
    hasUser: false,
    location: null,
    render: {
        app: false,
        authentication: false
    }
}

const app = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {
                hasUser: false,
                location: state.location,
                render: { app: false, authentication: true },
            }
        case CHECK_API_HEALTH:
            return {
                hasUser: state.hasUser,
                location: state.location,
                render: action.payload,
            }
        case HANDLE_APP_RENDER:
            return {
                hasUser: state.hasUser,
                location: state.location,
                render: action.payload,
            }
        case HANDLE_USER_STATE:
            return {
                hasUser: action.payload.hasUser,
                location: state.location,
                render: state.render,
            };
        case ROUTE_INIT:
            return {
                hasUser: state.hasUser,
                location: action.payload,
                render: state.render
            }
        default:
            return state;
    }
}

export default app;