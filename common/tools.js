/*
@providesModule common
*/
export function isEmpty(str) {
	return str === null || str === '' || str === undefined;
}

export function endWith(str, suffix) {
	var reg = new RegExp(suffix + '$');
	return reg.test(str);
}

export function startWith(str, prefix) {
	var reg = new RegExp('^' + prefix);
	return reg.test(str);
}

export function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export var bindThis = function(obj, ...args) {
	for (var k in args) {
		obj[args[k]] = obj[args[k]].bind(obj);
	}
};

export var isRemoteDebugging = () => typeof atob !== 'undefined';

export const makeCancelable = promise => {
	let hasCanceled_ = false;

	const wrappedPromise = new Promise((resolve, reject) => {
		promise.then(
			val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
			error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
		);
	});

	return {
		promise: wrappedPromise,
		cancel() {
			hasCanceled_ = true;
		}
	};
};

//等待socket返回一个action,如指定type则必须等到这个type的action
//超时后返回undefined
export var waitSocketAction = (socket, type = '', timeout = 5000) => {
	return new Promise((fill, reject) => {
		let clear = () => {
			clearTimeout(tm);
			socket.removeListener(socketListener);
		};
		let socketListener = action => {
			// console.log("recv action", action);
			if (type == '' || type == action.type) {
				clear();
				fill(action);
			}
		};
		let tm = setTimeout(() => {
			clear();
			fill();
		}, timeout);
		socket.on('action', socketListener);
	});
};

export var rnPlaySound = (path, callback) => {
	//var Sound = require('react-native-sound');

	var sound = new Sound(path, '', error => {
		if (error) {
			console.warn('failed to load the sound', error);
			return;
		}

		sound.play(callback);
	});
	return sound;
};

//快捷方法，使obj具有StatusInfo里的各种状态判断函数
export var useStatus = (obj, getter, StatusInfo) => {
	var defST;
	for (var k in StatusInfo) {
		var sv = StatusInfo[k];
		if (sv.DEF) defST = sv;

		(function(bk, bv) {
			obj['is' + bk] = function() {
				console.log('checkst', bk);
				return getter(obj) == bv;
			};
		})(k, sv);
	}
	//obj[field] = defST;
	//console.log(obj);
};

export const promiseTimeout = function(ms, promise) {
	// Create a promise that rejects in <ms> milliseconds
	let timeout = new Promise((resolve, reject) => {
		let id = setTimeout(() => {
			clearTimeout(id);
			reject('promise Timeout: ' + ms + 'ms.');
		}, ms);
	});

	// Returns a race between our timeout and the passed in promise
	return Promise.race([promise, timeout]);
};
