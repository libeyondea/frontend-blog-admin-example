import httpRequest from './httpRequest';
import { removeCookie } from './cookies';

export function logout(history, auth, changeAuthData) {
	if (auth) {
		httpRequest.get({
			url: '/logout',
			token: auth.token.access_token
		});
	}
	removeCookie('token');
	changeAuthData(null);
	history.push('/auth/signin');
}
