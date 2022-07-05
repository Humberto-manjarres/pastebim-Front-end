import axios from "axios";
import { types } from "../types/types";
import { USER_POST_ENDPOINT } from "../helpers/endpoints";

export const getUserPosts = () => dispatch => {
    /*TODO: hacer dispatch desde postsActions es ejecutar una función del userPostsReducer, en este caso para subir info al store*/
    return new Promise((resolve, reject) => {
        axios.get(USER_POST_ENDPOINT)
            .then(response => {
                //console.log('response -> ',response);
                
                dispatch(getPosts({fetched: true, posts: response.data}));
                
                resolve(response);
            })
            .catch(err => {
                console.log("err --> ",err);
                reject(err);
            })
    });

}

export const getPosts = ({fetched,posts}) => ({
    type: types.setUserPosts,
    payload: {fetched,posts}
})