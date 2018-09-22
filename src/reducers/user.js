import {USER_LOADING, USER_SUCCESS, USER_FAIL} from '../actions/UserActions'

export const initialState = {
    name: '',
    error: '',
    isFetching: false,
}

export function userReducer(state = initialState, action){
    switch (action.type){
        case USER_LOADING :
            return {...state, isFetching: true, error: ''}
        case USER_SUCCESS :
            return {...state, name: action.payload, isFetching: false}
        case USER_FAIL :
            return {...state, error: action.payload, isFetching: false}
        default:
            return state
    }
}