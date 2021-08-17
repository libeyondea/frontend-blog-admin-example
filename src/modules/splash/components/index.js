import { logout } from 'common/utils/auth';
import history from 'common/utils/history';
import httpRequest from 'common/utils/httpRequest';
import { getCookie, removeCookie } from 'common/utils/session';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeAppStateInitialized } from 'store/appState/actions';
import { changeAuth } from 'store/auth/actions';

const SplashComponent = () => {
	const auth = useSelector((state) => state.appAuth.current);
	const dispatch = useDispatch();

	const changeAuthData = useCallback((newAuth) => dispatch(changeAuth(newAuth)), [dispatch]);

	const changeAppStateInitializedData = useCallback(
		(newAppStateInitialized) => dispatch(changeAppStateInitialized(newAppStateInitialized)),
		[dispatch]
	);

	useEffect(() => {
		changeAppStateInitializedData('APP_STATE_INITIALIZED_YES');

		let token = getCookie('token');
		let initialUrl = getCookie('initial_url');

		if (auth) {
			if (initialUrl) {
				removeCookie('initial_url');
				history.replace(initialUrl);
			} else {
				history.replace('/main/dashboard');
			}
		} else if (token) {
			httpRequest
				.get({
					url: `/current-user`,
					token: token
				})
				.then((response) => {
					if (!response.data.success) {
						logout(history, auth, changeAuthData);
						return;
					}
					if (response.data.success) {
						console.log('66');
						changeAuthData(response.data.data);
						if (initialUrl) {
							removeCookie('initial_url');
							history.replace(initialUrl);
						} else {
							history.replace('/main/dashboard');
						}
					}
				})
				.catch((error) => {
					console.log(error);
					logout(history, auth, changeAuthData);
				});
			console.log('77');
		} else {
			console.log('old');
			changeAuthData(null);
			removeCookie('initial_url');
			history.replace('/auth/signin');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="text-center">
			<h1>Loading...</h1>
		</div>
	);
};

export default withRouter(SplashComponent);
