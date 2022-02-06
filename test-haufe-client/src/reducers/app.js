import {
    CHECK_API_HEALTH,
    HANDLE_APP_RENDER,
    HANDLE_USER_STATE,
    INIT_APP,
    LOGOUT,
    ROUTE_INIT,
    SET_USER
} from "../constants/actions";

const initialState = {
    acl: null,
    user: null,
    isInitialized: false,
    hasUser: false,
    location: null,
    render: {
        app: false,
        authentication: false
    }
}

const app = (state = initialState, action) => {
    switch (action.type) {
        case INIT_APP:
            return {
                acl: state.acl,
                user: state.user,
                isInitialized: true,
                hasUser: false,
                location: state.location,
                render: state.render
            };
        case SET_USER:
            return {
                acl: action.payload.acl,
                user: action.payload.user,
                isInitialized: state.isInitialized,
                hasUser: state.hasUser,
                location: state.location,
                render: state.render
            };
        case LOGOUT:
            return {
                acl: state.acl,
                user: state.user,
                isInitialized: state.isInitialized,
                hasUser: false,
                location: state.location,
                render: { app: false, authentication: true },
            }
        case CHECK_API_HEALTH:
            return {
                acl: state.acl,
                user: state.user,
                isInitialized: state.isInitialized,
                hasUser: state.hasUser,
                location: state.location,
                render: action.payload,
            }
        case HANDLE_APP_RENDER:
            return {
                acl: state.acl,
                user: state.user,
                isInitialized: state.isInitialized,
                hasUser: state.hasUser,
                location: state.location,
                render: action.payload,
            }
        case HANDLE_USER_STATE:
            return {
                acl: state.acl,
                user: state.user,
                isInitialized: state.isInitialized,
                hasUser: action.payload.hasUser,
                location: state.location,
                render: state.render,
            };
        case ROUTE_INIT:
            return {
                acl: state.acl,
                user: state.user,
                isInitialized: state.isInitialized,
                hasUser: state.hasUser,
                location: action.payload,
                render: state.render
            }
        default:
            return state;
    }
}

export default app;