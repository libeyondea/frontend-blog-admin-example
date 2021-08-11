import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb';
import Card from '@/common/components/Card';
import MainLayout from '@/layouts/MainLayout';
import ListCategoriesTable from '@/modules/categories/ListCategoriesTable';

const ListCategories = () => {
	return (
		<MainLayout>
			<div className="content-header py-3">
				<Breadcrumb>List categories</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="List categories">
					<ListCategoriesTable />
				</Card>
			</div>
		</MainLayout>
	);
};

export default ListCategories;
