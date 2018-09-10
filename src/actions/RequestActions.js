export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const REQUEST_BOOKS_SUCCEEDED = 'REQUEST_BOOKS_SUCCEEDED';
export const REQUEST_BOOKS_FAILED = 'REQUEST_BOOKS_FAILED';
export const FETCHED_BOOKS = 'FETCHED_BOOKS';

export const requestBooks = (payload) => ({
    type: REQUEST_BOOKS,
    payload: payload
});

export const requestBooksSucceeded = (payload) => ({
    type: REQUEST_BOOKS_SUCCEEDED,
    payload: payload
});

export const requestBooksFailed = (payload) => ({
    type: REQUEST_BOOKS_FAILED,
    payload: payload
});

export const fetchBooks = (payload) => ({
    type: FETCHED_BOOKS,
    payload: payload
});