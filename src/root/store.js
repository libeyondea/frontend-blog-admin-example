import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { changeAuthEpic } from 'store/auth/epics';
import { changeAppStateInitializedEpic } from 'store/appState/epics';
import authReducer from 'store/auth/reducers';
import appStateReducer from 'store/appState/reducers';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
	const store = createStore(
		combineReducers({
			appState: appStateReducer,
			appAuth: authReducer
		}),
		composeEnhancers(applyMiddleware(createLogger({ predicate: () => true }), epicMiddleware))
	);

	epicMiddleware.run(combineEpics(changeAppStateInitializedEpic, changeAuthEpic));

	return store;
};

export default configureStore;
