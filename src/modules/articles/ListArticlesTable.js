import React, { useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import CustomImage from '@/common/components/CustomImage';
import Table from '@/common/components/Table';
import TableLoading from '@/common/components/TableLoading';
import { articlesState } from '@/common/utils/recoilAtoms';
import { useArticles } from '@/common/utils/useAPIs';

import CellActions from './CellActions';
import CellPublished from './CellPublished';

const useArticlesRecoil = () => ({
	articlesState: useRecoilValue(articlesState),
	setArticlesState: useSetRecoilState(articlesState)
});

const ListArticlesTable = () => {
	const { articlesState, setArticlesState } = useArticlesRecoil();

	const { data: articles } = useArticles(
		articlesState.page,
		articlesState.limit,
		articlesState.sortby,
		articlesState.sortDirection
	);

	const list = articles?.data.map((i) => {
		return {
			id: i.id,
			image: i.image,
			slug: i.slug,
			title: i.title,
			category: i.category.title,
			tags: i.tags,
			published: i.published,
			pinned: i.pinned
		};
	});

	const data = useMemo(() => list, [list]);

	const CellTags = (data) => {
		return (
			<div>
				{data?.value?.map((value) => (
					<button
						type="button"
						className="badge bg-transparent rounded-pill text-decoration-none text-secondary border me-1"
						key={value.id}
					>
						<span className="text-muted">#</span>
						{value.title}
					</button>
				))}
			</div>
		);
	};

	const CellImage = (data) => {
		return data.value && <CustomImage src={data.value} width={150} height={90} alt={data.row.original.title} />;
	};

	const CellPinned = (data) => {
		return (
			<div className="form-check form-switch d-flex align-items-center justify-content-center p-0">
				<input
					className="form-check-input m-0"
					type="checkbox"
					name="pinned"
					id="pinned"
					checked={data.value ? true : false}
					onChange={() => {}}
				/>
				<label className="form-check-label d-none" htmlFor="pinned">
					Pinned
				</label>
			</div>
		);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'id',
				sortBy: true
			},
			{
				Header: 'Image',
				accessor: 'image',
				sortBy: true,
				Cell: (data) => CellImage(data)
			},
			{
				Header: 'Title',
				accessor: 'title',
				sortBy: true
			},
			{
				Header: 'Slug',
				accessor: 'slug',
				sortBy: true
			},
			{
				Header: 'Category',
				accessor: 'category',
				sortBy: true
			},
			{
				Header: 'Tags',
				accessor: 'tags',
				sortBy: true,
				style: {
					minWidth: 222
				},
				Cell: (data) => CellTags(data)
			},
			{
				Header: 'Published',
				accessor: 'published',
				sortBy: true,
				style: {
					minWidth: 90
				},
				Cell: (data) => CellPublished(data)
			},
			{
				Header: 'Pinned',
				accessor: 'pinned',
				sortBy: true,
				style: {
					minWidth: 90
				},
				Cell: (data) => CellPinned(data)
			},
			{
				Header: 'Actions',
				id: 'ations',
				accessor: 'id',
				style: {
					minWidth: 90
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
				<Table data={data} columns={columns} total={articles?.meta?.total} setState={setArticlesState} state={articlesState} />
			)}
		</>
	);
};

export default ListArticlesTable;
