import { setCookie } from 'common/utils/session';

const accessControl = {
	checkRoute: (store, history, pathname) => {
		let state = store.getState();
		console.log('redner');
		if (pathname !== '/' && state.appState.initialized !== 'APP_STATE_INITIALIZED_YES') {
			setCookie('initial_url', pathname);
			history.push(`/`);
			return;
		}

		if (pathname.indexOf('/auth') > -1 && state.appAuth.current) {
			history.push(`/main/dashboard`);
			return;
		}

		if (pathname.indexOf('/main') > -1 && !state.appAuth.current) {
			history.push(`/auth/signin`);
			return;
		}
	}
};

export default accessControl;
