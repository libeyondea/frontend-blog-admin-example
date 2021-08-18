import { filter, map } from 'rxjs/operators';

import * as actionTypes from './actionTypes';

export const changeAppStateInitializedEpic = (action$) =>
	action$.pipe(
		filter((action) => action.type === actionTypes.CHANGE_APP_STATE_INITIALIZED_REQUESTED),
		map((action) => ({
			type: actionTypes.CHANGE_APP_STATE_INITIALIZED_SUCCEED,
			payload: {
				...action.payload
			}
		}))
	);
