import React, { useMemo, useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import useSWR from 'swr';

import Table from '@/common/components/Table';
import TableLoading from '@/common/components/TableLoading';
import pageNumber from '@/common/utils/pageNumber';

const ListArticlesTable = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);

	const { data: articles } = useSWR(`/articles?offset=${(pageNumber(page) - 1) * limit}&limit=${limit}`, {
		revalidateOnFocus: false
	});

	const list = articles?.data.map((i) => {
		return {
			id: i.id,
			slug: i.slug,
			title: i.title,
			excerpt: i.excerpt,
			category_title: i.category.title
		};
	});

	const data = useMemo(() => list, [list]);

	const CellActions = (data) => {
		return (
			<div className="d-flex align-items-center justify-content-center">
				<button
					type="button"
					className="btn btn-secondary d-flex align-items-center me-2"
					onClick={() => {
						console.log(data.row.original);
					}}
				>
					<FaRegEdit />
				</button>
				<button
					type="button"
					className="btn btn-danger d-flex align-items-center"
					onClick={() => {
						console.log(data.row.original);
					}}
				>
					<FaRegTrashAlt />
				</button>
			</div>
		);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'Title',
				accessor: 'title',
				style: {
					width: '25%'
				}
			},
			{
				Header: 'Category',
				accessor: 'category_title',
				style: {
					width: '12%'
				}
			},
			{
				Header: 'Excerpt',
				accessor: 'excerpt',
				style: {
					width: 'auto'
				}
			},
			{
				Header: 'Actions',
				className: 'text-center align-middle',
				style: {
					width: '16%'
				},
				Cell: (data) => CellActions(data)
			}
		],
		[]
	);

	return (
		<>
			{!articles ? (
				<TableLoading />
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
		</>
	);
};

export default ListArticlesTable;
