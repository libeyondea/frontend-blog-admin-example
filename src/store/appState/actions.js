import * as actionTypes from './actionTypes.js';

export const changeAppStateInitialized = (newAppStateInitialized) => ({
	type: actionTypes.CHANGE_APP_STATE_INITIALIZED_REQUESTED,
	payload: {
		newAppStateInitialized
	}
});
