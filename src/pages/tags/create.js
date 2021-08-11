import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb';
import Card from '@/common/components/Card';
import MainLayout from '@/layouts/MainLayout';
import CreateTagForm from '@/modules/tags/CreateTagForm';

const CreateTag = () => {
	return (
		<MainLayout>
			<div className="content-header py-3">
				<Breadcrumb>Create tag</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="Create tag">
					<CreateTagForm />
				</Card>
			</div>
		</MainLayout>
	);
};

export default CreateTag;
