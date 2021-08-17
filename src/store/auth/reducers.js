import * as actionTypes from './actionTypes';

const initalState = {
	current: null
};

const authReducer = (state = initalState, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_AUTH_SUCCEED:
			return { current: action.payload.newAuth };
		default:
			return { ...state };
	}
};

export default authReducer;
