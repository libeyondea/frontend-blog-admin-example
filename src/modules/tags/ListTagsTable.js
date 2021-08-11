import React, { useMemo } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Table from '@/common/components/Table';
import TableLoading from '@/common/components/TableLoading';
import { tagsState } from '@/common/utils/recoilAtoms';
import { useCategories } from '@/common/utils/useAPIs';

const useTagsRecoil = () => ({
	tagsState: useRecoilValue(tagsState),
	setTagsState: useSetRecoilState(tagsState)
});

const ListTagsTable = () => {
	const { tagsState, setTagsState } = useTagsRecoil();

	const { data: tags } = useCategories(tagsState.page, tagsState.limit);

	const list = tags?.data.map((i) => {
		return {
			id: i.id,
			slug: i.slug,
			title: i.title,
			content: i.content,
			total_articles: i.total_articles
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
				Header: 'Id',
				accessor: 'id'
			},
			{
				Header: 'Title',
				accessor: 'title'
			},
			{
				Header: 'Slug',
				accessor: 'slug'
			},
			{
				Header: 'Content',
				accessor: 'content'
			},
			{
				Header: 'Total articles',
				accessor: 'total_articles'
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
			{!tags ? (
				<TableLoading />
			) : (
				<Table data={data} columns={columns} total={tags?.meta?.total} setState={setTagsState} state={tagsState} />
			)}
		</>
	);
};

export default ListTagsTable;
