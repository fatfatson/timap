// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { State, Dispatch } from './_helpers/_types';
import type { Connector } from 'react-redux';

type ComProps = {
	loggedIn: boolean,
	user: {
		name: string
	}
};

type DispatchProps = {
	doLogout: () => void
};

type Props = ComProps & DispatchProps;

const mapStateToProps = state => {
	const { loggedIn, user } = state.auth;
	return {
		loggedIn,
		user
	};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	doLogout: () => {}
});

class WhoAmI extends Component<Props> {
	render() {
		const { doLogout } = this.props;
		return (
			<div>
				历史时间轴&nbsp;&nbsp;
				{this.props.loggedIn && (
					<span>
						欢迎你: {this.props.user.name}{' '}
						<a className="btn btn-warning" onClick={doLogout}>
							注销
						</a>
					</span>
				)}
				{!this.props.loggedIn && <span>[未登录]</span>}
			</div>
		);
	}
}

const WhoAmIPage: Connector<ComProps, DispatchProps> = connect(
	mapStateToProps,
	mapDispatchToProps
)(WhoAmI);
export { WhoAmIPage as WhoAmI };
