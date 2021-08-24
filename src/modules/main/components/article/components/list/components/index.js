import BlockUIComponent from 'common/components/BlockUI/components';
import Breadcrumb from 'common/components/Breadcrumb/components';
import Card from 'common/components/Card/components';
import CustomImageComponent from 'common/components/CustomImage/components';
import Pagination from 'common/components/Pagination/components';
import TableLoading from 'common/components/TableLoading/components';
import history from 'common/utils/history';
import httpRequest from 'common/utils/httpRequest';
import pageNumber from 'common/utils/pageNumber';
import timeFormat from 'common/utils/timeFormat';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { FaRegEdit, FaRegTrashAlt, FaTrashRestoreAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ListArticleComponent = () => {
	const auth = useSelector((state) => state.appAuth.current);

	const [state, setState] = useState({
		data: {
			articles: [],
			totalAll: 0,
			totalPublished: 0,
			totalTrash: 0,
			totalDraft: 0,
			totalPending: 0
		},
		pagination: {
			articles: {
				page: 1,
				limit: 5,
				limits: [5, 10, 20, 100],
				total: 0
			}
		},
		filters: {
			articles: {
				sortBy: 'created_at',
				sortDirection: 'desc',
				status: 'all'
			}
		},
		loadings: {
			articles: false
		},
		deletings: {
			articles: false
		}
	});

	const onChangePage = (page) => {
		setState((prevState) => ({
			...prevState,
			pagination: {
				...prevState.pagination,
				articles: {
					...prevState.pagination.articles,
					page: page
				}
			}
		}));
	};

	const onChangeLimit = (limit) => {
		setState((prevState) => ({
			...prevState,
			pagination: {
				...prevState.pagination,
				articles: {
					...prevState.pagination.articles,
					limit: limit,
					page: 1
				}
			}
		}));
	};

	const onDeleteClicked = (event, article) => {
		event.preventDefault();
		if (window.confirm('Do you want to delete?')) {
			setState((prevState) => ({
				...prevState,
				deletings: {
					...prevState.deletings,
					articles: true
				}
			}));
			new Promise((resolve, reject) => {
				httpRequest
					.delete({
						url: `/articles/${article.id}`,
						token: auth.token.access_token
					})
					.then((response) => {
						if (!response.data.success) {
							console.log('Error');
							return reject(new Error('Error'));
						}
						return resolve(response);
					})
					.catch((error) => {
						console.log(error);
					})
					.finally(() => {});
			})
				.then((result) => {
					if (!result.data.success) {
						console.log('Error');
						return;
					}
					httpRequest
						.get({
							url: `/articles`,
							token: auth.token.access_token,
							params: {
								offset: (pageNumber(state.pagination.articles.page) - 1) * state.pagination.articles.limit,
								limit: state.pagination.articles.limit,
								sort_by: state.filters.articles.sortBy,
								sort_direction: state.filters.articles.sortDirection,
								status: state.filters.articles.status
							}
						})
						.then((response) => {
							if (!response.data.success) {
								console.log('Error');
								return;
							}
							setState((prevState) => ({
								...prevState,
								data: {
									...prevState.data,
									articles: response.data.data,
									totalAll: response.data.total_all,
									totalPublished: response.data.total_published,
									totalTrash: response.data.total_trash,
									totalDraft: response.data.total_draft,
									totalPending: response.data.total_pending
								},
								pagination: {
									...prevState.pagination,
									articles: {
										...prevState.pagination.articles,
										total: response.data.pagination.total
									}
								}
							}));
						})
						.catch((error) => {
							console.log(error);
						})
						.finally(() => {
							setState((prevState) => ({
								...prevState,
								deletings: {
									...prevState.deletings,
									articles: false
								}
							}));
						});
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {});
		}
	};

	const onUpdateStatusClicked = (event, article, value) => {
		event.preventDefault();
		if (window.confirm(value === 'untrash' ? 'Do you want to untrash?' : 'Do you want to move article to the trash?')) {
			setState((prevState) => ({
				...prevState,
				deletings: {
					...prevState.deletings,
					articles: true
				}
			}));
			new Promise((resolve, reject) => {
				httpRequest
					.put({
						url: `/articles/status/${article.id}`,
						token: auth.token.access_token,
						data: {
							status: value
						}
					})
					.then((response) => {
						if (!response.data.success) {
							console.log('Error');
							return reject(new Error('Error'));
						}
						return resolve(response);
					})
					.catch((error) => {
						console.log(error);
					})
					.finally(() => {});
			})
				.then((result) => {
					if (!result.data.success) {
						console.log('Error');
						return;
					}
					httpRequest
						.get({
							url: `/articles`,
							token: auth.token.access_token,
							params: {
								offset: (pageNumber(state.pagination.articles.page) - 1) * state.pagination.articles.limit,
								limit: state.pagination.articles.limit,
								sort_by: state.filters.articles.sortBy,
								sort_direction: state.filters.articles.sortDirection,
								status: state.filters.articles.status
							}
						})
						.then((response) => {
							if (!response.data.success) {
								console.log('Error');
								return;
							}
							setState((prevState) => ({
								...prevState,
								data: {
									...prevState.data,
									articles: response.data.data,
									totalAll: response.data.total_all,
									totalPublished: response.data.total_published,
									totalTrash: response.data.total_trash,
									totalDraft: response.data.total_draft,
									totalPending: response.data.total_pending
								},
								pagination: {
									...prevState.pagination,
									articles: {
										...prevState.pagination.articles,
										total: response.data.pagination.total
									}
								}
							}));
						})
						.catch((error) => {
							console.log(error);
						})
						.finally(() => {
							setState((prevState) => ({
								...prevState,
								deletings: {
									...prevState.deletings,
									articles: false
								}
							}));
						});
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {});
		}
	};

	const onChangeSortBy = (event) => {
		event.preventDefault();
		const value = event.target.value;
		if (value) {
			setState((prevState) => ({
				...prevState,
				filters: {
					...prevState.filters,
					articles: {
						...prevState.filters.articles,
						sortBy: event.target.value
					}
				}
			}));
		}
	};

	const onChangeSortDirection = (event) => {
		event.preventDefault();
		const value = event.target.value;
		if (value) {
			setState((prevState) => ({
				...prevState,
				filters: {
					...prevState.filters,
					articles: {
						...prevState.filters.articles,
						sortDirection: event.target.value
					}
				}
			}));
		}
	};

	const onChangeStatus = (event, value) => {
		event.preventDefault();
		setState((prevState) => ({
			...prevState,
			filters: {
				...prevState.filters,
				articles: {
					...prevState.filters.articles,
					status: value
				}
			},
			pagination: {
				...prevState.pagination,
				articles: {
					...prevState.pagination.articles,
					page: 1
				}
			}
		}));
	};

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			loadings: {
				...prevState.loadings,
				articles: true
			}
		}));
		httpRequest
			.get({
				url: `/articles`,
				token: auth.token.access_token,
				params: {
					offset: (pageNumber(state.pagination.articles.page) - 1) * state.pagination.articles.limit,
					limit: state.pagination.articles.limit,
					sort_by: state.filters.articles.sortBy,
					sort_direction: state.filters.articles.sortDirection,
					status: state.filters.articles.status
				}
			})
			.then((response) => {
				if (!response.data.success) {
					console.log('Error');
					return;
				}
				setState((prevState) => ({
					...prevState,
					data: {
						...prevState.data,
						articles: response.data.data,
						totalAll: response.data.total_all,
						totalPublished: response.data.total_published,
						totalTrash: response.data.total_trash,
						totalDraft: response.data.total_draft,
						totalPending: response.data.total_pending
					},
					pagination: {
						...prevState.pagination,
						articles: {
							...prevState.pagination.articles,
							total: response.data.pagination.total
						}
					}
				}));
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setState((prevState) => ({
					...prevState,
					loadings: {
						...prevState.loadings,
						articles: false
					}
				}));
			});
		return () => {};
	}, [
		auth.token.access_token,
		state.filters.articles.sortBy,
		state.filters.articles.sortDirection,
		state.filters.articles.status,
		state.pagination.articles.limit,
		state.pagination.articles.page
	]);

	const sortByList = [
		{
			value: 'title',
			label: 'Title'
		},
		{
			value: 'categories',
			label: 'Categories'
		},
		{
			value: 'tags',
			label: 'Tags'
		},
		{
			value: 'created_at',
			label: 'Created at'
		},
		{
			value: 'updated_at',
			label: 'Updated at'
		}
	];

	const sortDirectionList = [
		{
			value: 'desc',
			label: 'Desc'
		},
		{
			value: 'asc',
			label: 'Asc'
		}
	];

	return (
		<>
			<div className="content-header py-3">
				<Breadcrumb>List articles</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="List articles">
					<div className="position-relative">
						<div className="mb-3">
							<button
								type="button"
								className={classNames('bg-transparent border-0 p-0', {
									'text-primary': state.filters.articles.status === 'all'
								})}
								onClick={(event) => onChangeStatus(event, 'all')}
							>
								All ({state.data.totalAll})
							</button>
							<span className="mx-2">|</span>
							<button
								type="button"
								className={classNames('bg-transparent border-0 p-0', {
									'text-primary': state.filters.articles.status === 'publish'
								})}
								onClick={(event) => onChangeStatus(event, 'publish')}
							>
								Published ({state.data.totalPublished})
							</button>
							<span className="mx-2">|</span>
							<button
								type="button"
								className={classNames('bg-transparent border-0 p-0', {
									'text-primary': state.filters.articles.status === 'draft'
								})}
								onClick={(event) => onChangeStatus(event, 'draft')}
							>
								Draft ({state.data.totalDraft})
							</button>
							<span className="mx-2">|</span>
							<button
								type="button"
								className={classNames('bg-transparent border-0 p-0', {
									'text-primary': state.filters.articles.status === 'pending'
								})}
								onClick={(event) => onChangeStatus(event, 'pending')}
							>
								Pending ({state.data.totalPending})
							</button>
							<span className="mx-2">|</span>
							<button
								type="button"
								className={classNames('bg-transparent border-0 p-0', {
									'text-primary': state.filters.articles.status === 'trash'
								})}
								onClick={(event) => onChangeStatus(event, 'trash')}
							>
								Trash ({state.data.totalTrash})
							</button>
						</div>
						<div className="d-flex flex-column flex-sm-row">
							<div className="d-flex align-items-center mb-3 me-0 me-sm-3">
								<label htmlFor="sort_by" className="form-label mb-0 me-2">
									Sort by
								</label>
								<select
									id="sort_by"
									className="form-select form-select-sm w-auto"
									value={state.filters.articles.sortBy}
									onChange={(event) => onChangeSortBy(event)}
								>
									{sortByList.map((sortBy, index) => (
										<option value={sortBy.value} key={index}>
											{sortBy.label}
										</option>
									))}
								</select>
							</div>
							<div className="d-flex align-items-center mb-3">
								<label htmlFor="sort_direction" className="form-label mb-0 me-2">
									Sort direction
								</label>
								<select
									id="sort_direction"
									className="form-select form-select-sm w-auto"
									value={state.filters.articles.sortDirection}
									onChange={(event) => onChangeSortDirection(event)}
								>
									{sortDirectionList.map((sortBy, index) => (
										<option value={sortBy.value} key={index}>
											{sortBy.label}
										</option>
									))}
								</select>
							</div>
						</div>
						{state.loadings.articles ? (
							<TableLoading className="mb-3" />
						) : (
							!!state.data.articles.length && (
								<div className="table-responsive-xxl mb-3">
									<table className="table table-sm table-striped table-hover table-bordered mb-0" style={{ minWidth: 888 }}>
										<thead>
											<tr>
												<th className="align-middle">Image</th>
												<th className="align-middle">Title</th>
												<th className="align-middle" style={{ width: '15%' }}>
													Categories
												</th>
												<th className="align-middle" style={{ width: '15%' }}>
													Tags
												</th>
												<th className="align-middle" style={{ width: '11%' }}>
													Created at
												</th>
												<th className="align-middle" style={{ width: '11%' }}>
													Updated at
												</th>
												<th className="align-middle" style={{ width: '11%' }}></th>
											</tr>
										</thead>
										<tbody>
											{state.data.articles.map((article, index) => (
												<tr key={index}>
													<td className="align-middle">
														{article.image && (
															<CustomImageComponent src={article.image} width={100} height={60} alt={article.title} />
														)}
													</td>
													<td className="align-middle small">{article.title}</td>
													<td className="align-middle small">
														{article?.categories?.map((category, index) => (
															<button
																type="button"
																className="badge bg-transparent rounded-pill text-decoration-none text-secondary border me-1"
																key={index}
															>
																{category.title}
															</button>
														))}
													</td>
													<td className="align-middle small">
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
													<td className="align-middle small">{timeFormat(article.created_at)}</td>
													<td className="align-middle small">{timeFormat(article.updated_at)}</td>
													<td className="align-middle">
														<div className="d-flex align-items-center justify-content-center">
															{state.filters.articles.status === 'trash' ? (
																<>
																	<button
																		type="button"
																		className="btn btn-secondary d-flex align-items-center me-2"
																		onClick={(event) => onUpdateStatusClicked(event, article, 'untrash')}
																	>
																		<FaTrashRestoreAlt />
																	</button>
																	<button
																		type="button"
																		className="btn btn-danger d-flex align-items-center"
																		onClick={(event) => onDeleteClicked(event, article)}
																		disabled={state.deletings.articles}
																	>
																		<FaRegTrashAlt />
																	</button>
																</>
															) : (
																<>
																	<button
																		type="button"
																		className="btn btn-secondary d-flex align-items-center me-2"
																		onClick={() => history.push(`/main/articles/edit/${article.id}`)}
																	>
																		<FaRegEdit />
																	</button>
																	<button
																		type="button"
																		className="btn btn-warning d-flex align-items-center"
																		onClick={(event) => onUpdateStatusClicked(event, article, 'trash')}
																		disabled={state.deletings.articles}
																	>
																		<FaRegTrashAlt />
																	</button>
																</>
															)}
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)
						)}
						<Pagination
							limits={state.pagination.articles.limits}
							total={state.pagination.articles.total}
							limit={state.pagination.articles.limit}
							currentPage={state.pagination.articles.page}
							onChangePage={onChangePage}
							onChangeLimit={onChangeLimit}
						/>
						<BlockUIComponent blocking={state.deletings.articles} />
					</div>
				</Card>
			</div>
		</>
	);
};

export default ListArticleComponent;
