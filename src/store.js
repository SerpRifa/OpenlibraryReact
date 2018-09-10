import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import rootSaga from './sagas/listbook';
import createSagaMiddleware from 'redux-saga';


export default initialState =>{
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer, 
        initialState, 
        compose(
            applyMiddleware(sagaMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

    sagaMiddleware.run(rootSaga);
    return store;
}