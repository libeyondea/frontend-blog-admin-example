import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb';
import Card from '@/common/components/Card';
import MainLayout from '@/layouts/MainLayout';
import ListTagsTable from '@/modules/tags/ListTagsTable';

const ListTags = () => {
	return (
		<MainLayout>
			<div className="content-header py-3">
				<Breadcrumb>List tags</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="List tags">
					<ListTagsTable />
				</Card>
			</div>
		</MainLayout>
	);
};

export default ListTags;
