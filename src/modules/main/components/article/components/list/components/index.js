import Breadcrumb from 'common/components/Breadcrumb/components';
import Card from 'common/components/Card/components';
import CustomImageComponent from 'common/components/CustomImage/components';
import Pagination from 'common/components/Pagination/components';
import TableLoading from 'common/components/TableLoading/components';
import history from 'common/utils/history';
import httpRequest from 'common/utils/httpRequest';
import pageNumber from 'common/utils/pageNumber';
import React, { useCallback, useEffect, useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ListArticleComponent = () => {
	const auth = useSelector((state) => state.appAuth.current);

	const [state, setState] = useState({
		data: {
			articles: []
		},
		pagination: {
			page: 1,
			limit: 5,
			limits: [5, 10, 20, 100],
			total: 0
		},
		filter: {
			sortBy: 'id',
			sortDirection: 'desc'
		},
		loading: false,
		deleting: false
	});

	const onChangePage = (page) => {
		setState((prevState) => ({
			...prevState,
			pagination: {
				...prevState.pagination,
				page: page
			}
		}));
	};

	const onChangeLimit = (limit) => {
		setState((prevState) => ({
			...prevState,
			pagination: {
				...prevState.pagination,
				limit: limit,
				page: 1
			}
		}));
	};

	const onDeleteClicked = async (event, article) => {
		event.preventDefault();
		try {
			if (window.confirm('Do you want to delete?')) {
				setState((prevState) => ({
					...prevState,
					deleting: true
				}));
				const response = await httpRequest.delete({
					url: `/articles/${article.id}`,
					token: auth.token.access_token
				});
				if (response.data.success) {
					listArticles();
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setState((prevState) => ({
				...prevState,
				deleting: false
			}));
		}
	};

	const listArticles = useCallback(async () => {
		try {
			setState((prevState) => ({
				...prevState,
				loading: true
			}));
			const response = await httpRequest.get({
				url: `/articles`,
				token: auth.token.access_token,
				params: {
					offset: (pageNumber(state.pagination.page) - 1) * state.pagination.limit,
					limit: state.pagination.limit,
					sort_by: state.filter.sortBy,
					sort_direction: state.filter.sortDirection
				}
			});
			if (response.data.success) {
				setState((prevState) => ({
					...prevState,
					data: {
						...prevState.data,
						articles: response.data.data
					},
					pagination: {
						...prevState.pagination,
						total: response.data.meta.total
					}
				}));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setState((prevState) => ({
				...prevState,
				loading: false
			}));
		}
	}, [auth.token.access_token, state.filter.sortBy, state.filter.sortDirection, state.pagination.limit, state.pagination.page]);

	useEffect(() => {
		listArticles();
	}, [listArticles]);

	return (
		<>
			<div className="content-header py-3">
				<Breadcrumb>List articles</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="List articles">
					{state.loading ? (
						<TableLoading />
					) : (
						!!state.data.articles.length && (
							<div style={state.deleting ? { pointerEvents: 'none', opacity: 0.4 } : {}}>
								<div className="table-responsive-xxl mb-3">
									<table className="table table-striped table-hover table-bordered mb-0" style={{ minWidth: 888 }}>
										<thead>
											<tr>
												<th className="align-middle cursor-pointer text-center">Id</th>
												<th className="align-middle cursor-pointer text-center">Image</th>
												<th className="align-middle cursor-pointer text-center">Title</th>
												<th className="align-middle cursor-pointer text-center">Slug</th>
												<th className="align-middle cursor-pointer text-center">Category</th>
												<th className="align-middle cursor-pointer text-center">Tags</th>
												<th className="align-middle cursor-pointer text-center">Published</th>
												<th className="align-middle cursor-pointer text-center">Pinned</th>
												<th className="align-middle cursor-pointer text-center"></th>
											</tr>
										</thead>
										<tbody>
											{state.data.articles.map((article, index) => (
												<tr key={index}>
													<td className="align-middle">{article.id}</td>
													<td className="align-middle">
														{article.image && (
															<CustomImageComponent src={article.image} width={150} height={90} alt={article.title} />
														)}
													</td>
													<td className="align-middle">{article.title}</td>
													<td className="align-middle">{article.slug}</td>
													<td className="align-middle">{article.category.title}</td>
													<td className="align-middle">
														{article?.tags?.map((tag, index) => (
															<button
																type="button"
																className="badge bg-transparent rounded-pill text-decoration-none text-secondary border me-1"
																key={index}
															>
																<span className="text-muted">#</span>
																{tag.title}
															</button>
														))}
													</td>
													<td className="align-middle">{article.published ? 'Yes' : 'No'}</td>
													<td className="align-middle">{article.pinned ? 'Yes' : 'No'}</td>
													<td className="align-middle">
														<div className="d-flex align-items-center justify-content-center">
															<button
																type="button"
																className="btn btn-secondary d-flex align-items-center me-2"
																onClick={() => history.push(`/main/articles/edit/${article.id}`)}
															>
																<FaRegEdit />
															</button>
															<button
																type="button"
																className="btn btn-danger d-flex align-items-center"
																onClick={(event) => onDeleteClicked(event, article)}
																disabled={state.deleting}
															>
																<FaRegTrashAlt />
															</button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<Pagination
									limits={state.pagination.limits}
									total={state.pagination.total}
									limit={state.pagination.limit}
									currentPage={state.pagination.page}
									onChangePage={onChangePage}
									onChangeLimit={onChangeLimit}
								/>
							</div>
						)
					)}
				</Card>
			</div>
		</>
	);
};

export default ListArticleComponent;
