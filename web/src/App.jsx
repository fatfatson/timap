import React, { Component } from 'react';
import AlertContainer from 'react-alert';
import { Router, NavLink, Route, withRouter, Switch } from 'react-router-dom';

import { history } from './_helpers/_history';

import { PrivateRoute } from './_components';
import './App.css';

import Home from './Home';
import About from './About';
import { WhoAmI } from './WhoAmI';
import { connect } from 'react-redux';
import type { State, Dispatch, RouteProps } from './_helpers/_types';

type ComProps = {
	connectState: string,
	user: {
		token: string,
		name: string
	},
	dispatch: *,
	loggingIn: boolean,
	loggedIn: boolean
};

const mapStateToProps = (state, ownProps): ComProps => {
	return { connectState: state.net.connectState };
};

class App extends Component<ComProps> {
	constructor(props: ComProps) {
		super(props);
	}
	alertOptions = {
		offset: 14,
		position: 'bottom left',
		theme: 'dark',
		time: 5000,
		transition: 'scale'
	};

	showAlert = (msg, type) => {
		this.msg.show(msg, {
			time: 2000,
			type: type || 'info'
		});
	};

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.connectState != this.props.connectState) {
			if (nextProps.connectState == 'yes') {
				this.showAlert('网络已连接', 'success');
				const { user } = this.props;
				if (user) {
					//this.props.dispatch(userActions.loginUseToken(user.token));
				}
			} else {
				this.showAlert('网络已断开', 'error');
			}
		}
	}

	render() {
		return (
			<Router history={history}>
				<div
					style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}
				>
					<AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
					<header className="App-header" align="center">
						<img
							src={require('./logo.svg')}
							className="App-logo"
							style={{
								animationPlayState:
									this.props.connectState == 'yes' ? '' : 'paused'
							}}
							alt="logo"
						/>
						<WhoAmI />
					</header>
					<br />
					<ul>
						<NavLink to="/">Home</NavLink>&nbsp;&nbsp;
						<NavLink to="/about">About</NavLink>&nbsp;&nbsp;
					</ul>
					<hr style={{ width: '100%' }} />
					<div style={{ display: 'flex', flexGrow: 1 }}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/about" component={About} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

const ConnectedApp = connect(mapStateToProps)(App);
export { ConnectedApp as App };
