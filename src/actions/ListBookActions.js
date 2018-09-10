export const HIDE_COLUMN = 'HIDE_COLUMN';
export const SHOW_COLUMN = 'SHOW_COLUMN';
export const ADD_SELECTED = 'ADD_SELECTED';
export const DELETE_SELECTED = 'DELETE_SELECTED';
export const SET_PAGE = 'SET_PAGE';
export const SET_ROWPERPAGE = 'SET_ROWPERPAGE';
export const CHANGE_SEARCH = 'CHANGE_SEARCH';
export const SET_DATA = 'SET_DATA';
export const SET_TAG = 'SET_TAG';


export const hideColumn = (payload) => ({
    type: HIDE_COLUMN,
    payload: payload
});

export const showColumn = (payload) => ({
    type: SHOW_COLUMN,
    payload: payload
});

export const addSelected = (payload) => ({
    type: ADD_SELECTED,
    payload: payload
});

export const deleteSelected = (payload) => ({
    type: DELETE_SELECTED,
    payload: payload
});

export const setPage = (payload) => ({
    type: SET_PAGE,
    payload: payload
});

export const changeSearch = (payload) => ({
    type: CHANGE_SEARCH,
    payload: payload
});

export const setData = (payload) => ({
    type: SET_DATA,
    payload: payload
});

export const setTag = (payload) => ({
    type: SET_TAG,
    payload: payload
});