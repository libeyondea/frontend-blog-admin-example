import React from 'react';
import { Redirect } from 'react-router-dom';
import CreateArticleComponent from './create/components';
import EditArticleComponent from './edit/components';
import ListArticleComponent from './list/components';

const MainRouter = [
	{
		path: `/main/articles`,
		exact: true,
		component: ListArticleComponent
	},
	{
		path: `/main/articles/create`,
		exact: true,
		component: CreateArticleComponent
	},
	{
		path: `/main/articles/edit/:articleId`,
		exact: true,
		component: EditArticleComponent
	},
	{
		path: '*',
		component: () => <Redirect to={`/`} />
	}
];

export default MainRouter;
