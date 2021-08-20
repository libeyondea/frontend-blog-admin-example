import React from 'react';
import { Redirect } from 'react-router-dom';
import CreateCategoryComponent from './create/components';
import EditCategoryComponent from './edit/components';
import ListCategoryComponent from './list/components';

const CategoryRouter = [
	{
		path: `/main/categories`,
		exact: true,
		component: ListCategoryComponent
	},
	{
		path: `/main/categories/create`,
		exact: true,
		component: CreateCategoryComponent
	},
	{
		path: `/main/categories/edit/:categoryId`,
		exact: true,
		component: EditCategoryComponent
	},
	{
		path: '*',
		component: () => <Redirect to={`/`} />
	}
];

export default CategoryRouter;
