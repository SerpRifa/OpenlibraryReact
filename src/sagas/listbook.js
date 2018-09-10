import {
    takeEvery,
    put,
    call
  } from 'redux-saga/effects';

import { 
    requestBooks, 
    requestBooksSucceeded,
    requestBooksFailed 
} from '../actions/RequestActions';

export default function* fetchBooks(action) {    
    yield takeEvery('FETCHED_BOOKS', fetchBooksAsync);
}

function* fetchBooksAsync(action) {    
    try {
      yield put(requestBooks());
      const data = yield call(() => {        
        return fetch("http://openlibrary.org/search.json?q="+action.payload)
            .then(res => res.json())
        }
      );
      yield put(requestBooksSucceeded(data.docs));
    } catch (error) {
      yield put(requestBooksFailed());
    }
}
