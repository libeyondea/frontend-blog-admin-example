import BlockUIComponent from 'common/components/BlockUI/components';
import Breadcrumb from 'common/components/Breadcrumb/components';
import Card from 'common/components/Card/components';
import Pagination from 'common/components/Pagination/components';
import TableLoading from 'common/components/TableLoading/components';
import history from 'common/utils/history';
import httpRequest from 'common/utils/httpRequest';
import pageNumber from 'common/utils/pageNumber';
import React, { useEffect, useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ListTagComponent = () => {
	const auth = useSelector((state) => state.appAuth.current);

	const [state, setState] = useState({
		data: {
			tags: []
		},
		pagination: {
			tags: {
				page: 1,
				limit: 5,
				limits: [5, 10, 20, 100],
				total: 0
			}
		},
		filters: {
			tags: {
				sortBy: 'created_at',
				sortDirection: 'desc'
			}
		},
		loadings: {
			tags: false
		},
		deletings: {
			tags: false
		}
	});

	const onChangePage = (page) => {
		setState((prevState) => ({
			...prevState,
			pagination: {
				...prevState.pagination,
				tags: {
					...prevState.pagination.tags,
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
				tags: {
					...prevState.pagination.tags,
					limit: limit,
					page: 1
				}
			}
		}));
	};

	const onDeleteClicked = (event, tag) => {
		event.preventDefault();
		if (window.confirm('Do you want to delete?')) {
			setState((prevState) => ({
				...prevState,
				deletings: {
					...prevState.deletings,
					tags: true
				}
			}));
			new Promise((resolve, reject) => {
				httpRequest
					.delete({
						url: `/tags/${tag.id}`,
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
							url: `/tags`,
							token: auth.token.access_token,
							params: {
								offset: (pageNumber(state.pagination.tags.page) - 1) * state.pagination.tags.limit,
								limit: state.pagination.tags.limit,
								sort_by: state.filters.tags.sortBy,
								sort_direction: state.filters.tags.sortDirection
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
									tags: response.data.data
								},
								pagination: {
									...prevState.pagination,
									tags: {
										...prevState.pagination.tags,
										total: response.data.meta.total
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
									tags: false
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
					tags: {
						...prevState.filters.tags,
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
					tags: {
						...prevState.filters.tags,
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
				tags: true
			}
		}));
		httpRequest
			.get({
				url: `/tags`,
				token: auth.token.access_token,
				params: {
					offset: (pageNumber(state.pagination.tags.page) - 1) * state.pagination.tags.limit,
					limit: state.pagination.tags.limit,
					sort_by: state.filters.tags.sortBy,
					sort_direction: state.filters.tags.sortDirection
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
						tags: response.data.data
					},
					pagination: {
						...prevState.pagination,
						tags: {
							...prevState.pagination.tags,
							total: response.data.meta.total
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
						tags: false
					}
				}));
			});
		return () => {};
	}, [
		auth.token.access_token,
		state.filters.tags.sortBy,
		state.filters.tags.sortDirection,
		state.pagination.tags.limit,
		state.pagination.tags.page
	]);

	const sortByList = [
		{
			value: 'id',
			label: 'Id'
		},
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
				<Breadcrumb>List tags</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="List tags">
					{state.loadings.tags ? (
						<TableLoading />
					) : (
						!!state.data.tags.length && (
							<div className="position-relative">
								<div className="d-flex justify-content-end flex-column flex-sm-row">
									<div className="d-flex align-items-center mb-3 me-0 me-sm-3">
										<label htmlFor="sort_by" className="form-label mb-0 me-2">
											Sort by
										</label>
										<select
											id="sort_by"
											className="form-select form-select-sm w-auto"
											value={state.filters.tags.sortBy}
											onChange={(event) => onChangeSortBy(event)}
										>
											<option value="">Select</option>
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
											value={state.filters.tags.sortDirection}
											onChange={(event) => onChangeSortDirection(event)}
										>
											<option value="">Select</option>
											{sortDirectionList.map((sortBy, index) => (
												<option value={sortBy.value} key={index}>
													{sortBy.label}
												</option>
											))}
										</select>
									</div>
								</div>
								<div className="table-responsive-xxl mb-3">
									<table className="table table-striped table-hover table-bordered mb-0" style={{ minWidth: 888 }}>
										<thead>
											<tr>
												<th className="align-middle">Id</th>
												<th className="align-middle">Title</th>
												<th className="align-middle">Slug</th>
												<th className="align-middle">Total articles</th>
												<th className="align-middle"></th>
											</tr>
										</thead>
										<tbody>
											{state.data.tags.map((tag, index) => (
												<tr key={index}>
													<td className="align-middle">{tag.id}</td>
													<td className="align-middle">{tag.title}</td>
													<td className="align-middle">{tag.slug}</td>
													<td className="align-middle">{tag.total_articles}</td>
													<td className="align-middle">
														<div className="d-flex align-items-center justify-content-center">
															<button
																type="button"
																className="btn btn-secondary d-flex align-items-center me-2"
																onClick={() => history.push(`/main/tags/edit/${tag.id}`)}
															>
																<FaRegEdit />
															</button>
															<button
																type="button"
																className="btn btn-danger d-flex align-items-center"
																onClick={(event) => onDeleteClicked(event, tag)}
																disabled={state.deletings.tags}
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
									limits={state.pagination.tags.limits}
									total={state.pagination.tags.total}
									limit={state.pagination.tags.limit}
									currentPage={state.pagination.tags.page}
									onChangePage={onChangePage}
									onChangeLimit={onChangeLimit}
								/>
								<BlockUIComponent blocking={state.deletings.tags} />
							</div>
						)
					)}
				</Card>
			</div>
		</>
	);
};

export default ListTagComponent;
