import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb';
import Card from '@/common/components/Card';
import MainLayout from '@/layouts/MainLayout';
import ListArticlesTable from '@/modules/articles/ListArticlesTable';

const ListArticles = () => {
	return (
		<MainLayout>
			<div className="content-header py-3">
				<Breadcrumb>List articles</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="List articles">
					<ListArticlesTable />
				</Card>
			</div>
		</MainLayout>
	);
};

export default ListArticles;
