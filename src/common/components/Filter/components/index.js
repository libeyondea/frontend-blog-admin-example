import React from 'react';

const FilterComponent = ({
	sortBy,
	onChangeSortBy,
	sortByList,
	sortDirection,
	onChangeSortDirection,
	sortDirectionList,
	q,
	handleSubmitSearch,
	handleChangeSearch
}) => {
	const onChangeSortByNew = (event) => {
		event.preventDefault();
		onChangeSortBy(event.target.value);
	};

	const onChangeSortDirectionNew = (event) => {
		event.preventDefault();
		onChangeSortDirection(event.target.value);
	};

	const handleSubmitSearchNew = (event) => {
		event.preventDefault();
		handleSubmitSearch();
	};

	const handleChangeSearchNew = (event) => {
		handleChangeSearch(event.target.value);
	};

	return (
		<div className="d-flex flex-column flex-md-row">
			<div className="d-flex flex-column flex-sm-row">
				<div className="d-flex align-items-center mb-2 mb-sm-3 me-0 me-sm-3">
					<label htmlFor="sort_by" className="form-label mb-0 me-2">
						Sort by
					</label>
					<select id="sort_by" className="form-select form-select-sm w-auto" value={sortBy} onChange={onChangeSortByNew}>
						{sortByList.map((sortBy, index) => (
							<option value={sortBy.value} key={index}>
								{sortBy.label}
							</option>
						))}
					</select>
				</div>
				<div className="d-flex align-items-center mb-2 mb-sm-3">
					<label htmlFor="sort_direction" className="form-label mb-0 me-2">
						Sort direction
					</label>
					<select
						id="sort_direction"
						className="form-select form-select-sm w-auto"
						value={sortDirection}
						onChange={onChangeSortDirectionNew}
					>
						{sortDirectionList.map((sortBy, index) => (
							<option value={sortBy.value} key={index}>
								{sortBy.label}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="d-flex align-items-center ms-auto mb-2 mb-sm-3">
				<form onSubmit={handleSubmitSearchNew} className="d-flex align-items-center">
					<input
						type="text"
						placeholder="Enter keyword"
						className="form-control form-control-sm me-2"
						onChange={handleChangeSearchNew}
						value={q}
						name="search"
						id="search"
					/>
					<button type="submit" className="btn btn-outline-secondary btn-sm">
						Search
					</button>
				</form>
			</div>
		</div>
	);
};

export default FilterComponent;
