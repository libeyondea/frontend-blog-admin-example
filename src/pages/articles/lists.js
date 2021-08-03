import React, { useMemo, useState } from 'react';
import useSWR from 'swr';

import Breadcrumb from '@/common/components/Breadcrumb';
import Card from '@/common/components/Card';
import Table from '@/common/components/Table';
import pageNumber from '@/common/utils/pageNumber';
import MainLayout from '@/layouts/MainLayout';

const ListArticles = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);

	const { data: articles } = useSWR(`/articles?offset=${(pageNumber(page) - 1) * limit}&limit=${limit}`, {
		revalidateOnFocus: false
	});

	const list = articles?.data.map((i) => {
		return {
			title: i.title,
			excerpt: i.excerpt,
			category_title: i.category.title
		};
	});

	const data = useMemo(() => list, [list]);

	const columns = useMemo(
		() => [
			{
				Header: 'Title',
				accessor: 'title',
				width: '25%'
			},
			{
				Header: 'Category',
				accessor: 'category_title',
				width: '12%'
			},
			{
				Header: 'Excerpt',
				accessor: 'excerpt',
				width: 'auto'
			}
		],
		[]
	);

	return (
		<MainLayout>
			<div className="content-header py-3">
				<Breadcrumb>List articles</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="List articles">
					{!articles ? (
						<div>Loading...</div>
					) : (
						<Table
							data={data}
							columns={columns}
							setPage={setPage}
							setLimit={setLimit}
							currentPage={page}
							limit={limit}
							total={articles?.meta?.total}
						/>
					)}
				</Card>
			</div>
		</MainLayout>
	);
};

export default ListArticles;
