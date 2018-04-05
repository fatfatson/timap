// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'react-bootstrap-dialog';

import { userActions } from './_actions/user.action';
import './App.css';
import type { Connector } from 'react-redux';
import type { State, Dispatch, RouteProps } from './_helpers/_types';
import { history } from './_helpers/_history';
import { Redirect } from 'react-router';

var md5 = require('md5');

type ComProps = {
	loggingIn: boolean,
	loggedIn: boolean
};

type DispatchProps = {
	doLogin: (string, string, string) => void,
	doRegister: (string, string, string) => void
};

type Props = ComProps & DispatchProps & RouteProps;

type ComState = {
	username: string,
	password: string
};

const mapStateToProps = (state: State, ownProps): ComProps => {
	//console.log('ownProps', ownProps);
	const { loggingIn, loggedIn } = state.auth;
	const { registering, err: registerErr } = state.register;
	return { loggingIn, loggedIn, registering, registerErr };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	doLogin: (username, password, fromUrl) => {
		dispatch(userActions.login(username, password, fromUrl));
	},

	doRegister: (username, password) => {
		dispatch(userActions.register(username, password));
	}
});

class Login extends Component<Props, ComState> {
	dialog: any;

	constructor(props: Props) {
		super(props);
		this.state = {
			username: '18003733593',
			password: '123456'
		};
		//console.log('ctor Login', this);
	}

	isPoneAvailable(str) {
		var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
		if (!myreg.test(str)) {
			return false;
		} else {
			return true;
		}
	}

	handleChange(field, e) {
		//console.log('change', field, '->', e.target.value);
		var state = {};
		state[field] = e.target.value;
		this.setState(state);
	}

	handleClick() {
		const { loggingIn, doLogin, location } = this.props;
		const { username, password } = this.state;
		if (username && password) {
			const fromUrl = location.state && location.state.from.pathname;
			doLogin(username, md5(password), fromUrl);
		}
	}

	handleClickReg() {
		const { loggingIn, doRegister } = this.props;
		const { username, password } = this.state;

		if (!this.isPoneAvailable(username)) {
			this.dialog.showAlert('请输入正确的手机号');
			return;
		}
		if (password.length < 6) {
			this.dialog.showAlert('密码不能少于6位');
			return;
		}
		if (username && password) {
			doRegister(username, md5(password));
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if (!nextProps.loggingIn && this.props.loggingIn) {
			if (!nextProps.loggedIn) {
				this.dialog.showAlert('login fail!');
			} else {
				const { location } = this.props;
				const fromUrl = (location.state && location.state.from.pathname) || '/';
				//history.push(fromUrl);
				this.redirectUrl = fromUrl;
			}
		}

		if (!nextProps.registering && this.props.registering) {
			console.log('register finish', nextProps.registerErr);
			if (!nextProps.registerErr) {
				this.dialog.showAlert('注册成功!');
			} else {
				this.dialog.showAlert('注册失败!' + nextProps.registerErr);
			}
		}
	}

	render() {
		//console.log('render, this.redirectUrl', this.redirectUrl);
		return (
			<div className="App">
				{this.redirectUrl && <Redirect to={this.redirectUrl} />}
				<p>
					手机号：<input
						type="text"
						value={this.state.username}
						onChange={e => this.handleChange('username', e)}
					/>
					<br />
					<br />
					密&nbsp;&nbsp;码：<input
						type="password"
						value={this.state.password}
						onChange={e => this.handleChange('password', e)}
					/>
					<br />
					<br />
					<button
						type="button"
						disabled={this.props.loggingIn}
						onClick={() => this.handleClick()}
					>
						登录
					</button>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button
						type="button"
						disabled={this.props.loggingIn}
						onClick={() => this.handleClickReg()}
					>
						注册
					</button>
					<br />
					{this.props.loggingIn && (
						<img
							alt="loading"
							src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
						/>
					)}
				</p>
				<Dialog
					ref={el => {
						this.dialog = el;
					}}
				/>
			</div>
		);
	}
}

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(Login);
export { connectedLoginPage as Login };
