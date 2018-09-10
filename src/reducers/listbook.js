import {
    HIDE_COLUMN, 
    SHOW_COLUMN, 
    ADD_SELECTED,
    DELETE_SELECTED,
    CHANGE_SEARCH,
    SET_DATA,
    SET_TAG
    } from '../actions/ListBookActions';

import { 
    REQUEST_BOOKS, 
    REQUEST_BOOKS_SUCCEEDED,
    REQUEST_BOOKS_FAILED    
} from '../actions/RequestActions';

const _getHideKeys = () => {
    let hideKeysLocalStorage = localStorage.getItem('hideKeys');
    if (hideKeysLocalStorage) {
        return new Set(JSON.parse(hideKeysLocalStorage));
    }
    return new Set(['key']);
}

const _setHideKeys = (hideKeys) => {
    localStorage.setItem('hideKeys', JSON.stringify([...hideKeys]));
}

let listBookInit = {    
    hideKeys: _getHideKeys(),
    selected: [],
    selectedRow: null,
    search: 'JavaScript',
    loading: false,
    selectedTag: '',
    data: []
}

export default (state = listBookInit, action) => {        
    switch(action.type){

        case HIDE_COLUMN:{
            let hideKeys = new Set(state.hideKeys);
            hideKeys.add(action.payload);
            _setHideKeys(hideKeys);
            return {...state, hideKeys: hideKeys};
        }

        case SHOW_COLUMN:{
            let hideKeys = new Set(state.hideKeys);
            hideKeys.delete(action.payload);
            _setHideKeys(hideKeys);
            return {...state, hideKeys: hideKeys};
        }

        case ADD_SELECTED:{            
            return {...state, selected: [action.payload.key], selectedRow: action.payload};
        }

        case DELETE_SELECTED:{   
            let selected = [...state.selected];
            selected = selected.filter(n => !(n === action.payload));
            return {...state, selected: selected};
        }

        case CHANGE_SEARCH:{               
            return {...state, search: action.payload};
        }

        case REQUEST_BOOKS:{               
            return {...state, loading: true};
        }

        case REQUEST_BOOKS_SUCCEEDED:{               
            return {...state, loading: false, data: action.payload};
        }

        case REQUEST_BOOKS_FAILED:{               
            return {...state, loading: false};
        }
        
        case SET_DATA:{               
            return {...state, loading: false, data: action.payload};
        }

        case SET_TAG: {
            return {...state, selectedTag: action.payload}
        }

        default: return state;
    }
}