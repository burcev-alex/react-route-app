import {combineReducers} from 'redux';
import {userReducer} from './user';
import {pageReducer} from './page';

export const rootReducers = combineReducers({
    page: pageReducer,
    user: userReducer,
});