import { types } from "../types/types";

const initialState = {
    posts: [],
    fetched: false
};
 export const userPostsReducer = (state = initialState, action) => {
    console.log('action --> ',action);
    const { type , payload } = action;
    switch (type) {
        case types.setUserPosts:
            return{
                ...state,
                fetched: payload.fetched,
                posts: payload.posts
            }

        default:
            return state;
    }
 }