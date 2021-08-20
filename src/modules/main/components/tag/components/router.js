import React from 'react';
import { Redirect } from 'react-router-dom';
import CreateTagComponent from './create/components';
import EditTagComponent from './edit/components';
import ListTagComponent from './list/components';

const TagRouter = [
	{
		path: `/main/tags`,
		exact: true,
		component: ListTagComponent
	},
	{
		path: `/main/tags/create`,
		exact: true,
		component: CreateTagComponent
	},
	{
		path: `/main/tags/edit/:tagId`,
		exact: true,
		component: EditTagComponent
	},
	{
		path: '*',
		component: () => <Redirect to={`/`} />
	}
];

export default TagRouter;
