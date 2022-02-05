import {CHECK_API_HEALTH, HANDLE_APP_RENDER, HANDLE_USER_STATE, LOGOUT, ROUTE_INIT} from "../constants/actions";
import {getXHR, postXHR} from "../util/functions";
import Cookies from "universal-cookie/es6";
import { Buffer } from "buffer";

export const routeInit = (payload) => ({
    type: ROUTE_INIT,
    payload: payload
});

export const handleUserState = (payload) => ({
    type: HANDLE_USER_STATE,
    payload: payload,
});

export const handleAppRender = (payload) => ({
    type: HANDLE_APP_RENDER,
    payload: payload,
});

export const checkApiHealth = (payload) => ({
    type: CHECK_API_HEALTH,
    payload: payload
});

export const onRouteInit = (path) => {
    return (dispatch) => {
        dispatch(routeInit(path))
    };
}

export const logoutUser = (payload) => ({
   type: LOGOUT,
   payload: payload
});

export const checkUser = (type, data, success, fail) => {
    return (dispatch) => {
        dispatch(auth(type, data, success, fail));
    }
}

export const checkApi = (type, data, success, fail) => {
    return (dispatch) => {
        getXHR({
            auth: {},
            data: {},
            action: '/api/v1'
        }, (res) => {

            let persistent = getPersistentTokens();
            if(typeof persistent.email !== typeof null) {
                dispatch(auth(
                    'token',
                    {
                        email: persistent.email,
                        password: persistent.token,
                        jwtToken: persistent.jwtToken,
                        action: "/session/token-auth"
                    }
                ));
            } else
                dispatch(checkApiHealth({app: false, authentication: true}))

            if (success && typeof(success) == "function")
                success()



        }, (err) => {
            dispatch(checkApiHealth({app: false, authentication: false}))

            if (fail && typeof(fail) == "function")
                fail()
        });
    }
}



export const register = (type, data, success, fail) => {
    let authStr = new Buffer(data.email + ':' + data.password).toString('base64')

    return (dispatch) => {
        postXHR({
                auth: getBasicAuth(authStr),
                data: { name: data.name },
                action: data.action
            },
            (res) => {
                addAuthCookies({email: res.user.email, token: res.token, jwtToken: res.jwtToken})

                dispatch(handleUserState({hasUser: true}))
                dispatch(handleAppRender({app: true, authentication: false}))

                if (success && typeof(success) == "function")
                    success()
            },
            (err) => {
                if (fail && typeof(fail) == "function")
                    fail()
            }
        );
    }
}

export const auth = (type, data, success, fail) => {
    let authStr = new Buffer(data.email + ':' + data.password).toString('base64')
    if(type === 'token')
        authStr = data.password

    let authData = {
        basic: getBasicAuth(authStr),
        token: getTokenAuth(authStr, data.jwtToken)
    }

    return (dispatch) => {
        getXHR({
            auth: authData[type],
            data: {},
            action: data.action
        }, (res) => {
            if(type === 'basic')
                addAuthCookies({email: res.user.email, token: res.token, jwtToken: res.jwtToken})

            dispatch(handleUserState({hasUser: true}))
            dispatch(handleAppRender({app: true, authentication: false}))

            if (success && typeof(success) == "function")
                success()

        }, (err) => {
            dispatch(handleUserState({hasUser: false}))
            dispatch(handleAppRender({app: false, authentication: true}))

            if (fail && typeof(fail) == "function")
                fail()
        })
    }
}

export const logout = () => {
    let persistent = getPersistentTokens();
    return (dispatch) => {
        postXHR(
            {action: '/session/destroy', auth: getTokenAuth(persistent.token, persistent.jwtToken), data: {}},
            (res) => {
                let cookies = new Cookies();

                cookies.remove('auth-token');
                cookies.remove('auth-user');
                cookies.remove('jwt-token');

                dispatch(logoutUser());
            }, (err) => {

            })
    };
}

export const getBasicAuth = (str) => ({
    'Authorization': 'Basic ' + str,
    'WWW-Authenticate': 'Basic realm="api"',
});

export const getTokenAuth = (str, jwt) => {
    return {
        'authorization': 'Token ' + str,
        'x-jwt': jwt,
    }
}

export const addAuthCookies = (data) => {
    let cookies = new Cookies()
    cookies.set("auth-user", data.email, {
        path: '/',
        expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 2))
    });
    cookies.set("auth-token", data.token, {
        path: '/',
        expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 2))
    });
    cookies.set("jwt-token", data.jwtToken, {
        path: '/',
        expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 2))
    });
}

export const getPersistentTokens = () => {
    let cookies = new Cookies()
    let email = null;
    let token = null;
    let jwtToken = null;

    if(typeof cookies.get("auth-user") !== typeof undefined &&
        typeof cookies.get("auth-token") !== typeof undefined) {
        email = cookies.get('auth-user');
        token = cookies.get('auth-token');
        jwtToken = cookies.get('jwt-token');
    }

    return {email: email, token: token, jwtToken:jwtToken};
}