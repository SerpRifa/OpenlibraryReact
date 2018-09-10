import { ADD_TAG } from '../actions/BookActions';
import { SET_DATA_LOCAL, CHANGE_LANG } from '../actions/GlobalActions';
import {RU, EN} from '../lang'

const _getRowsLocalStorage = () => {
    let savedRowsSerial = localStorage.getItem('savedRows');    

    let savedRows = [];

    if (savedRowsSerial) {
        savedRows = JSON.parse(savedRowsSerial);
    }

    return savedRows;
}

const _getTagsLocalStorage = () => {
    let tagsSerial = localStorage.getItem('tags');    

    let tags = [];
    
    if (tagsSerial) {
        tags = JSON.parse(tagsSerial);        
    }

    return tags;
}

const _getMessages = (lang) => {
    if (lang === 'EN')
        return EN;
    return RU;
}

const _getLang = () => {
    let lang = localStorage.getItem('lang'); 

    if (lang) {
        return JSON.parse(lang);
    }

    return 'RU';
}

const _getHeaders = (lang) => {
    return  [{name: 'Key', key: 'key'}, 
        {name: _getMessages(lang)['cover'], key:"cover_edition_key"},
        {name: _getMessages(lang)['name'], key:"title_suggest"}, 
        {name: _getMessages(lang)["publisher"], key:"publisher"}, 
        {name: _getMessages(lang)["author"], key:"author_name"}]
}

let globalInit = {    
    tags: _getTagsLocalStorage(),
    savedRows: _getRowsLocalStorage(),
    localData: [],
    m: _getMessages(_getLang()),
    header: _getHeaders(_getLang()),
    lang: _getLang()
}

const _saveToLocalStorage = (savedRows, tags) => {
    localStorage.setItem('savedRows', JSON.stringify(savedRows));
    localStorage.setItem('tags', JSON.stringify(tags));
}

const _saveLang = (lang) => {
    localStorage.setItem('lang', JSON.stringify(lang));
}

export default (state = globalInit, action) => {        
    switch(action.type){
        case ADD_TAG:{                        
            let tags = [...state.tags];            
            let savedRows = [...state.savedRows];            
            const { value, row } = action.payload;            
            const exist = savedRows.find(book => { return book.key === row.key});            
            if (!exist) {
                row.tags = [value];
                savedRows.push(row);
            } else {
                row.tags = exist.tags;
                if (row.tags.indexOf(value) === -1) {
                    row.tags.push(value);
                }                    
            }               

            if (tags.indexOf(value) === -1) {
                tags.push(value);
            }
    
            _saveToLocalStorage(savedRows, tags);

            return {...state, tags: tags, savedRows: savedRows};
        }

        case SET_DATA_LOCAL:{
            return {...state, localData: action.payload};
        }      
        
        case CHANGE_LANG: {
            const lang  = action.payload;
            const header = _getHeaders(lang);
            _saveLang(lang);
            return {...state, lang: lang, header: header, m: _getMessages(lang)};
        }
 
        default: return state;
    }
}