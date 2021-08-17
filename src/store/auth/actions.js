import * as actionTypes from './actionTypes.js';

export const changeAuth = (newAuth) => ({
	type: actionTypes.CHANGE_AUTH_REQUESTED,
	payload: {
		newAuth
	}
});
