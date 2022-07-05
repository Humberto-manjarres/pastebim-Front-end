import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { userPostsReducer } from "../reducers/userPostsReducer";


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    posts: userPostsReducer
})

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
)