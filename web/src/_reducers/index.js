import { combineReducers } from 'redux';
import { net } from './net.reducer';
import { auth } from './auth.reducer';

const rootReducer = combineReducers({
	net,
	auth
});

export default rootReducer;
