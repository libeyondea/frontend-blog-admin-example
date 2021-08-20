import React from 'react';
import { Redirect } from 'react-router-dom';
import ArticleComponent from './article/components';
import CategoryComponent from './category/components';
import TagComponent from './tag/components';
import DashboardComponent from './dashboard/components';

const MainRouter = [
	{
		path: `/main/dashboard`,
		exact: true,
		component: DashboardComponent
	},
	{
		path: `/main/articles`,
		component: ArticleComponent
	},
	{
		path: `/main/categories`,
		component: CategoryComponent
	},
	{
		path: `/main/tags`,
		component: TagComponent
	},
	{
		path: '*',
		component: () => <Redirect to={`/`} />
	}
];

export default MainRouter;
