class Utils {
	getOrdinalNum = number => {
		let selector;

		if (number <= 0) {
			selector = 4;
		} else if ((number > 3 && number < 21) || number % 10 > 3) {
			selector = 0;
		} else {
			selector = number % 10;
		}

		return number + ['th', 'st', 'nd', 'rd', ''][selector];
	};

	shortMonthAndDate = date => {
		const day = (new Date(date)).getDate();
		const month = (new Date(date)).toLocaleString('default', { month: 'short' });
		return `${day} ${month}`;
	}

	shortMonthAndDateWithOrdinal = date => {
		const month = (new Date(date)).toLocaleString('default', { month: 'short' });
		const day = this.getOrdinalNum((new Date(date)).getDate());
		return `${day} ${month}`;
	}

	longMonthAndDate = date => {
		const day = (new Date(date)).getDate();
		const month = (new Date(date)).toLocaleString('default', { month: 'long' });
		return `${month} ${day} `;
	}

	dateAndTime = () => {
		const day = this.getOrdinalNum((new Date()).getDate());
		const month = (new Date()).toLocaleString('default', { month: 'short' });
		return `${day} ${month}, ${this.getAMPM()}`;
	}

	getAMPM = () => {
		const date = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
		let hours = date.getHours();
		let minutes = date.getMinutes();
		const ampm = hours >= 12 ? 'PM' : 'AM';
		hours %= 12;
		hours = hours || 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? `0${minutes}` : minutes;
		const strTime = `${hours}:${minutes} ${ampm}`;
		return strTime;
	}

	getIndianNumberFormat = value => {
		let val = Math.abs(value);
		if (val >= 10000000) {
			val = `${(val / 10000000).toFixed(2)} Cr`;
		} else if (val >= 100000) {
			val = `${(val / 100000).toFixed(2)} L`;
		}
		return val;
	}

	getDefaultDateFormat = date => {
		return date.toISOString().split('T')[0];
	}

	round = num => {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	}

	getPathString = name => {
		return name.toLocaleLowerCase().split(' ').join('-');
	}
}

const utils = new Utils();
Object.freeze(utils);

export default utils;
