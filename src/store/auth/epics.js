import { filter, map } from 'rxjs/operators';

import * as actionTypes from './actionTypes';

export const changeAuthEpic = (action$) =>
	action$.pipe(
		filter((action) => action.type === actionTypes.CHANGE_AUTH_REQUESTED),
		map((action) => ({
			type: actionTypes.CHANGE_AUTH_SUCCEED,
			payload: { ...action.payload }
		}))
	);
