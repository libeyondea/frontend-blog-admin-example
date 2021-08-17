import React from 'react';
import { Redirect } from 'react-router-dom';
import SigninCompoment from './signin/components';
import SignupComponent from './signup/components';

const MainRouter = [
	{
		path: `/auth/signin`,
		exact: true,
		component: SigninCompoment
	},
	{
		path: `/auth/signup`,
		exact: true,
		component: SignupComponent
	},
	{
		path: '*',
		component: () => <Redirect to={`/`} />
	}
];

export default MainRouter;
