import * as actionTypes from './actionTypes'
import setAuthToken from './../../utils/setAuthToken';
export const setCurrentUser = (token) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: token
    };
}
export const logoutUser = () => {
    localStorage.removeItem('userCreds');
    localStorage.removeItem('type');
    setAuthToken(null)
    return {
        type: actionTypes.LOGOUT_CURRENT_USER
    };
}
export const setAllUsers = (users) => {
    return {
        type: actionTypes.ALL_USERS_DATA,
        payload:users
    };
}
export const setAllProcessedCsv = (data) => {
    return {
        type: actionTypes.ALL_PROCESSED_CSV,
        payload:data
    };
}