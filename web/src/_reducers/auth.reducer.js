import { netConst, userConst } from '../const';

const initialState = { loggedIn: false, loggingIn: false, user: null };

export function auth(state = initialState, action) {
	switch (action.type) {
	case netConst.DISCONNECTED:
		return {
			...state,
			loggingIn: false
		};
	case userConst.LOGIN_REQUEST:
		return {
			loggingIn: true,
			user: action.user
		};
	case userConst.LOGIN_SUCCESS:
		return {
			loggedIn: true,
			user: action.user
		};
	case userConst.LOGIN_FAILURE:
		return {};
	case userConst.LOGOUT:
		return {};
	default:
		return state;
	}
}
