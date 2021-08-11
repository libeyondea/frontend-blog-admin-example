import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb';
import Card from '@/common/components/Card';
import MainLayout from '@/layouts/MainLayout';
import EditArticleForm from '@/modules/articles/EditArticleForm';

const EditArticle = () => {
	return (
		<MainLayout>
			<div className="content-header py-3">
				<Breadcrumb>Edit article</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="Edit article">
					<EditArticleForm />
				</Card>
			</div>
		</MainLayout>
	);
};

export default EditArticle;
