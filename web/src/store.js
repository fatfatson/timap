import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import io from 'socket.io-client';
import rootReducer from './_reducers';
import { netConst } from './const';

//create socket
var socket = io('http://www.19v5.com:12345');
socket.on('connect', () => {
	store.dispatch({ type: netConst.CONNECTED });
});
socket.on('disconnect', () => {
	store.dispatch({ type: netConst.DISCONNECTED });
});

//create store
var loggerMiddleware = createLogger();
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

if (module.hot) {
	module.hot.accept('./_reducers', () => {
		const nextRootReducer = require('./_reducers').default;
		store.replaceReducer(nextRootReducer);
	});
}
