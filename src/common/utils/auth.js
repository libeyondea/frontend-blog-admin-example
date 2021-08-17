import httpRequest from './httpRequest';
import { removeCookie } from './session';

export function logout(history, authData, changeAuthData) {
	if (authData) {
		httpRequest.get({
			url: '/logout',
			token: authData.token.access_token
		});
	}
	removeCookie('token');
	changeAuthData(null);
	history.push(`/auth/signin`);
}
