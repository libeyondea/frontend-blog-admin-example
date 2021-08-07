import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb';
import Card from '@/common/components/Card';
import MainLayout from '@/layouts/MainLayout';
import CreateArticleForm from '@/modules/articles/CreateArticleForm';

const CreateArticle = () => {
	return (
		<MainLayout>
			<div className="content-header py-3">
				<Breadcrumb>Create article</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="Create article">
					<CreateArticleForm />
				</Card>
			</div>
		</MainLayout>
	);
};

export default CreateArticle;
