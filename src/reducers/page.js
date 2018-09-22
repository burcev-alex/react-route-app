import {PHOTOS_LOADING, PHOTOS_SUCCESS, PHOTOS_FAIL} from '../actions/PageActions'

export const initialState = {
    year: 2018,
    photos: [],
    error: '',
    isFetching: false,
}

export function pageReducer(state = initialState, action){
    switch (action.type){
        case PHOTOS_LOADING :
            return {...state, year: action.payload, isFetching: true, error: ''}
         case PHOTOS_SUCCESS :
            return {...state, photos: action.payload, isFetching: false, error: ''}
         case PHOTOS_FAIL :
            return {...state, error: action.payload, isFetching: false}
        default:
            return state
    }
}