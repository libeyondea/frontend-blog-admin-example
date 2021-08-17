import * as actionTypes from './actionTypes';

const initalState = {
	initialized: 'APP_STATE_INITIALIZED_NO'
};

const appStateReducer = (state = initalState, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_APP_STATE_INITIALIZED_SUCCEED:
			return { initialized: action.payload.newAppStateInitialized };
		default:
			return { ...state };
	}
};

export default appStateReducer;
