import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

import httpRequest from '@/common/utils/httpRequest';
import { articlesState } from '@/common/utils/recoilAtoms';
import { getCookie } from '@/common/utils/session';
import { useArticles } from '@/common/utils/useAPIs';

const useArticlesRecoil = () => ({
	articlesState: useRecoilValue(articlesState)
});

const CellActions = (data) => {
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);

	const { articlesState } = useArticlesRecoil();

	const { mutate } = useArticles(articlesState.page, articlesState.limit, articlesState.sortby, articlesState.sortDirection);

	const onDeletePostClicked = async (e) => {
		e.preventDefault();
		try {
			if (window.confirm('Do you want to delete?')) {
				setLoading(true);
				const response = await httpRequest.delete({
					url: `/articles/${data.value}`,
					token: getCookie('token')
				});
				if (response.data.success) {
					await mutate();
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="d-flex align-items-center justify-content-center">
			<button
				type="button"
				className="btn btn-secondary d-flex align-items-center me-2"
				onClick={() => router.push(`/articles/edit/${data.value}`)}
			>
				<FaRegEdit />
			</button>
			<button
				type="button"
				className="btn btn-danger d-flex align-items-center"
				onClick={onDeletePostClicked}
				disabled={isLoading}
			>
				<FaRegTrashAlt />
			</button>
		</div>
	);
};

export default CellActions;
