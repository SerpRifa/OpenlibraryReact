import listbook from './listbook'
import book from './book'
import global from './global'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    global,
    listbook,
    book    
});

export default rootReducer;