export const ADD_TAG = 'ADD_TAG';
export const DELETE_TAG = 'DELETE_TAG';
export const SET_TAGS = 'SET_TAGS';

export const addTag = (payload) => ({
    type: ADD_TAG,
    payload: payload
});

export const deleteTag = (payload) => ({
    type: DELETE_TAG,
    payload: payload
});

export const setTags = (payload) => ({
    type: SET_TAGS,
    payload: payload
});