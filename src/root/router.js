import AuthComponent from 'modules/auth/components';
import MainComponent from 'modules/main/components';
import SplashComponent from 'modules/splash/components';
import React from 'react';
import { Redirect } from 'react-router-dom';

const AppRouter = [
	{
		path: `/auth`,
		component: AuthComponent
	},
	{
		path: `/`,
		exact: true,
		component: SplashComponent
	},
	{
		path: `/main`,
		component: MainComponent
	},
	{
		path: '*',
		component: () => <Redirect to="/" />
	}
];

export default AppRouter;
