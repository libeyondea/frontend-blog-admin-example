import moment from 'moment';

const timeFormat = (value) => {
	return moment(value, 'YYYY-MM-DD HH:mm:ss').format('YYYY/MM/DD HH:mm:ss');
};

export default timeFormat;
