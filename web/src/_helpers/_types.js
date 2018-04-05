// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

export type State = {
	auth: {
		loggingIn: boolean,
		loggedIn: boolean,
		user: {
			name: string,
			id: string
		}
	}
};

export type Action = { type: 'INCREASE' } | { type: 'DECREASE' };

export type Store = ReduxStore<State, Action>;

export type ThunkedAction = (dispatch: Dispatch) => void;

export type Dispatch = ReduxDispatch<Action> &
	((action: ThunkedAction) => void);

/////////////////////////////////////
export type RouteProps = {
	location: {
		state: {
			from: {
				pathname: string
			}
		}
	}
};
