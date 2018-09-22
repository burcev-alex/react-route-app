import {PHOTOS_LOADING, PHOTOS_SUCCESS} from '../actions/PageActions'

export const initialState = {
    year: 2018,
    photos: [],
    isFetching: false,
}

export function pageReducer(state = initialState, action){
    switch (action.type){
        case PHOTOS_LOADING :
            return {...state, year: action.payload, isFetching: true}
         case PHOTOS_SUCCESS :
            return {...state, photos: action.payload, isFetching: false}
        default:
            return state
    }
}