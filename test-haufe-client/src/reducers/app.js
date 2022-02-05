import {CHANGE_ROUTE} from "../constants/actions";

const initialState = {
    hasUser: false,
    location: null,
}

const app = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ROUTE:
            return {
                hasUser: state.hasUser,
                location: action.payload
            }

        default:
            return state;
    }
}

export default app;