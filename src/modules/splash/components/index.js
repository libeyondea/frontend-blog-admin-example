import { logout } from 'common/utils/auth';
import history from 'common/utils/history';
import httpRequest from 'common/utils/httpRequest';
import { getCookie, removeCookie } from 'common/utils/cookies';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeAppStateInitialized } from 'store/appState/actions';
import { changeAuth } from 'store/auth/actions';
import CustomImageComponent from 'common/components/CustomImage/components';
import config from 'config';
import styles from '../styles/styles.module.scss';

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

		const token = getCookie('token');
		const initialUrl = getCookie('initial_url');

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
					changeAuthData(response.data.data);
					if (initialUrl) {
						removeCookie('initial_url');
						history.replace(initialUrl);
					} else {
						history.replace('/main/dashboard');
					}
				})
				.catch((error) => {
					console.log(error);
					logout(history, auth, changeAuthData);
				});
		} else {
			changeAuthData(null);
			removeCookie('initial_url');
			history.replace('/auth/signin');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="text-center vh-100">
			<CustomImageComponent
				className={`${styles.loading} rounded-circle`}
				src={config.LOGO_URL}
				width={122}
				height={122}
				alt="Loading..."
			/>
		</div>
	);
};

export default withRouter(SplashComponent);
