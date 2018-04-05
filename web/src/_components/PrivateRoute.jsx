import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

type Props = {
	component: *,
	location: string,
	loggedIn: boolean
};

export const TestRoute = ({ location }: Props) => {
	return <div>{location}</div>;
};

const PrivateRoute = ({ component: OriginComponent, loggedIn, ...rest }) => (
	<Route
		{...rest}
		render={(props: Props) => {
			return loggedIn ? (
				<OriginComponent {...props} />
			) : (
				<div>
					<Redirect
						to={{ pathname: '/login', state: { from: props.location } }}
					/>
				</div>
			);
		}}
	/>
);

function mapStateToProps(state) {
	const { loggedIn, user } = state.auth;
	return {
		loggedIn,
		user
	};
}

const PrivateRouteR = withRouter(connect(mapStateToProps)(PrivateRoute));
export { PrivateRouteR as PrivateRoute };
