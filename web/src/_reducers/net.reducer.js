import { netConst } from '../const';
const initialState = { connectState: 'no' };
export function net(state = initialState, action) {
	switch (action.type) {
	case netConst.CONNECTED:
		return {
			...state,
			connectState: 'yes'
		};
	case netConst.DISCONNECTED:
		return Object.assign({}, state, {
			connectState: 'no'
		});
	default:
		return state;
	}
}
