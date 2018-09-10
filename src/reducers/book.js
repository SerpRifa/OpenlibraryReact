import { ADD_TAG, DELETE_TAG, SET_TAGS } from '../actions/BookActions';
import { ADD_SELECTED } from '../actions/ListBookActions';

let bookInit = {    
    tags: []    
}

export default (state = bookInit, action) => {        
    switch(action.type){

        case ADD_TAG:{            
            const { value } = action.payload;
            if (state.tags.indexOf(value) === -1) {
                return {...state, tags: [...state.tags, value]};
            }
            return {...state};
        }

        case DELETE_TAG:{
            let tags = [...state.tags];
            tags = tags.filter(n => !(n === action.payload));
            return {...state, tags: tags};
        }    
        
        case SET_TAGS:{            
            return {...state, tags: [...action.payload]};
        }  
        
        case ADD_SELECTED:{            
            return {...state, tags: [...action.payload.tags]};
        }

        default: return state;
    }
}