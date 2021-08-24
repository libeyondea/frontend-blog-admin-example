import BlockUIComponent from 'common/components/BlockUI/components';
import Breadcrumb from 'common/components/Breadcrumb/components';
import Card from 'common/components/Card/components';
import Pagination from 'common/components/Pagination/components';
import TableLoading from 'common/components/TableLoading/components';
import history from 'common/utils/history';
import httpRequest from 'common/utils/httpRequest';
import pageNumber from 'common/utils/pageNumber';
import timeFormat from 'common/utils/timeFormat';
import React, { useEffect, useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ListCategoryComponent = () => {
	const auth = useSelector((state) => state.appAuth.current);

	const [state, setState] = useState({
		data: {
			categories: []
		},
		pagination: {
			categories: {
				page: 1,
				limit: 5,
				limits: [5, 10, 20, 100],
				total: 0
			}
		},
		filters: {
			categories: {
				sortBy: 'created_at',
				sortDirection: 'desc'
			}
		},
		loadings: {
			categories: false
		},
		deletings: {
			categories: false
		}
	});

	const onChangePage = (page) => {
		setState((prevState) => ({
			...prevState,
			pagination: {
				...prevState.pagination,
				categories: {
					...prevState.pagination.categories,
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
				categories: {
					...prevState.pagination.categories,
					limit: limit,
					page: 1
				}
			}
		}));
	};

	const onDeleteClicked = (event, category) => {
		event.preventDefault();
		if (window.confirm('Do you want to delete?')) {
			setState((prevState) => ({
				...prevState,
				deletings: {
					...prevState.deletings,
					categories: true
				}
			}));
			new Promise((resolve, reject) => {
				httpRequest
					.delete({
						url: `/categories/${category.id}`,
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
							url: `/categories`,
							token: auth.token.access_token,
							params: {
								offset: (pageNumber(state.pagination.categories.page) - 1) * state.pagination.categories.limit,
								limit: state.pagination.categories.limit,
								sort_by: state.filters.categories.sortBy,
								sort_direction: state.filters.categories.sortDirection
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
									categories: response.data.data
								},
								pagination: {
									...prevState.pagination,
									categories: {
										...prevState.pagination.categories,
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
									categories: false
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
					categories: {
						...prevState.filters.categories,
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
					categories: {
						...prevState.filters.categories,
						sortDirection: event.target.value
					}
				}
			}));
		}
	};

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			loadings: {
				...prevState.loadings,
				categories: true
			}
		}));
		httpRequest
			.get({
				url: `/categories`,
				token: auth.token.access_token,
				params: {
					offset: (pageNumber(state.pagination.categories.page) - 1) * state.pagination.categories.limit,
					limit: state.pagination.categories.limit,
					sort_by: state.filters.categories.sortBy,
					sort_direction: state.filters.categories.sortDirection
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
						categories: response.data.data
					},
					pagination: {
						...prevState.pagination,
						categories: {
							...prevState.pagination.categories,
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
						categories: false
					}
				}));
			});
		return () => {};
	}, [
		auth.token.access_token,
		state.filters.categories.sortBy,
		state.filters.categories.sortDirection,
		state.pagination.categories.limit,
		state.pagination.categories.page
	]);

	const sortByList = [
		{
			value: 'title',
			label: 'Title'
		},
		{
			value: 'slug',
			label: 'Slug'
		},
		{
			value: 'total_articles',
			label: 'Total articles'
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
				<Breadcrumb>List categories</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="List categories">
					<div className="position-relative">
						<div className="d-flex flex-column flex-sm-row">
							<div className="d-flex align-items-center mb-3 me-0 me-sm-3">
								<label htmlFor="sort_by" className="form-label mb-0 me-2">
									Sort by
								</label>
								<select
									id="sort_by"
									className="form-select form-select-sm w-auto"
									value={state.filters.categories.sortBy}
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
									value={state.filters.categories.sortDirection}
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
						{state.loadings.categories ? (
							<TableLoading className="mb-3" />
						) : (
							!!state.data.categories.length && (
								<div className="table-responsive-xxl mb-3">
									<table className="table table-sm  table-striped table-hover table-bordered mb-0" style={{ minWidth: 888 }}>
										<thead>
											<tr>
												<th className="align-middle">Title</th>
												<th className="align-middle">Slug</th>
												<th className="align-middle">Total articles</th>
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
											{state.data.categories.map((category, index) => (
												<tr key={index}>
													<td className="align-middle small">{category.title}</td>
													<td className="align-middle small">{category.slug}</td>
													<td className="align-middle small">{category.total_articles}</td>
													<td className="align-middle small">{timeFormat(category.created_at)}</td>
													<td className="align-middle small">{timeFormat(category.updated_at)}</td>
													<td className="align-middle">
														<div className="d-flex align-items-center justify-content-center">
															<button
																type="button"
																className="btn btn-secondary d-flex align-items-center me-2"
																onClick={() => history.push(`/main/categories/edit/${category.id}`)}
															>
																<FaRegEdit />
															</button>
															<button
																type="button"
																className="btn btn-danger d-flex align-items-center"
																onClick={(event) => onDeleteClicked(event, category)}
																disabled={state.deletings.categories}
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
							)
						)}
						<Pagination
							limits={state.pagination.categories.limits}
							total={state.pagination.categories.total}
							limit={state.pagination.categories.limit}
							currentPage={state.pagination.categories.page}
							onChangePage={onChangePage}
							onChangeLimit={onChangeLimit}
						/>
						<BlockUIComponent blocking={state.deletings.categories} />
					</div>
				</Card>
			</div>
		</>
	);
};

export default ListCategoryComponent;
