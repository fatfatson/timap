export default class TimeRange {
	constructor(start, stop, interval) {
		this.start = start;
		this.stop = stop;
		this.interval = interval;
	}

	getTime(index) {
		return this.start + index;
	}

	getCount() {
		var year = this.stop - this.start + 1;
		var dt = 1;
		switch (this.interval) {
		case '100y':
			dt = 0.01;
			break;
		case '10y':
			dt = 0.1;
			break;
		case 's':
			dt = 4;
			break;
		case 'm':
			dt = 12;
			break;
		case 'd':
			dt = 365;
			break;
		}

		return year * dt;
	}
}
