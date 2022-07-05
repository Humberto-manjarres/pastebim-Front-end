import axios from "axios";
import { LOGIN_ENDPOINT,REGISTER_ENDPOINT } from "../helpers/endpoints";
import { types } from "../types/types";
import jwt_decode from "jwt-decode";
import setAuthToken from "../helpers/setAuthToken";

/**TODO: userData son los datos del usuario email y pass */
export const loginUser = (userData) => dispatch => {
    //console.log('userData --> ', userData);
    return new Promise((resolve, reject) => {
        axios.post(LOGIN_ENDPOINT, userData, { headers: { 'Accept': 'application/json', 'Content-type': 'application/json' } })
            .then(response => {
                const { authorization, userid } = response.headers;
                localStorage.setItem('jwtToken', authorization);

                setAuthToken(authorization);

                const decode = jwt_decode(authorization)
                dispatch(setCurrentUser({ user: decode, loggedIn: true }));
                resolve(response);
            })
            .catch(error => {
                console.log('error--> ', error);
                reject(error)
            })
    })
}

export const setCurrentUser = ({ user, loggedIn }) => {
    return {
        type: types.login,
        payload: { user, loggedIn }

    }
}

export const logoutUser = () => {
    return (dispatch) => {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(setCurrentUser({ user: {}, loggedIn: false }));
    }
}


export const registerUser = (userData) => dispatch => {
    //console.log('userData --> ', userData);
    return new Promise((resolve, reject) => {
        axios.post(REGISTER_ENDPOINT, userData, { headers: { 'Accept': 'application/json', 'Content-type': 'application/json' } })
            .then(response => {
                
                resolve(response);
            })
            .catch(error => {
                console.log('error--> ', error);
                reject(error)
            })
    })
}


export const login = (id, displayName) => ({
    type: types.login,
    payload: {
        id,
        displayName
    }
})