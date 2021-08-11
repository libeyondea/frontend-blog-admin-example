import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb';
import Card from '@/common/components/Card';
import MainLayout from '@/layouts/MainLayout';
import CreateCategoryForm from '@/modules/categories/CreateCategoryForm';

const CreateCategory = () => {
	return (
		<MainLayout>
			<div className="content-header py-3">
				<Breadcrumb>Create category</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="Create category">
					<CreateCategoryForm />
				</Card>
			</div>
		</MainLayout>
	);
};

export default CreateCategory;
