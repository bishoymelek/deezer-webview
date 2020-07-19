import { combineReducers, createStore, applyMiddleware } from 'redux';
import Middleware from 'state-config/middleware';
import * as dataProviders from 'data-providers';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import genresStore from './genreStore';

const middleware = new Middleware(dataProviders);

const rootReducer = combineReducers({
  api_genres: genresStore.reducer(),
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({
  trace: true,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(middleware.watchApiCall);

export { store };
export default store;
