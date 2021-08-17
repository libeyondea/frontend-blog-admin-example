import React from 'react';
import { Redirect } from 'react-router-dom';
import ArticleComponent from './article/components';
import DashboardComponent from './dashboard/components';

const MainRouter = [
	{
		path: `/main/articles`,
		component: ArticleComponent
	},
	{
		path: `/main/dashboard`,
		exact: true,
		component: DashboardComponent
	},
	{
		path: '*',
		component: () => <Redirect to={`/`} />
	}
];

export default MainRouter;
