export const SET_DATA_LOCAL = 'SET_DATA_LOCAL';
export const CHANGE_LANG = 'CHANGE_LANG';

export const setDataLocal = (payload) => ({
    type: SET_DATA_LOCAL,
    payload: payload
});

export const changeLang = (payload) => ({
    type: CHANGE_LANG,
    payload: payload
});