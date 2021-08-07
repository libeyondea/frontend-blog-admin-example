import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';
import { usePagination, useTable } from 'react-table';

import getPageNumbers from '@/common/utils/getPageNumbers';

import { paginationStyles } from './Table.styles';

const Table = ({ setPage, columns, data, currentPage, limit, setLimit, total }) => {
	const totalPage = Math.ceil(total / limit);
	const pageNumbers = getPageNumbers({ currentPage, limit, total });

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		// canPreviousPage,
		// canNextPage,
		pageOptions,
		pageCount,
		// gotoPage,
		// nextPage,
		// previousPage,
		setPageSize,
		// Get the state from the instance
		state: { pageIndex, pageSize }
	} = useTable(
		{
			columns,
			data,
			useControlledState: (state) => {
				return React.useMemo(
					() => ({
						...state,
						pageIndex: currentPage
					}),
					// eslint-disable-next-line react-hooks/exhaustive-deps
					[state, currentPage]
				);
			},
			initialState: { pageIndex: currentPage }, // Pass our hoisted table state
			manualPagination: true, // Tell the usePagination
			// hook that we'll handle our own data fetching
			// This means we'll also have to provide our own
			// pageCount.
			pageCount: totalPage
		},
		usePagination
	);

	return (
		<div>
			<div className="table-responsive-xxl mb-3">
				<table {...getTableProps()} className="table table-striped table-hover table-bordered mb-0" style={{ minWidth: 888 }}>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr {...headerGroup.getHeaderGroupProps()} key={index}>
								{headerGroup.headers.slice(0, 1).map((column, index) => (
									<th
										{...column.getHeaderProps([
											{
												className: column.className,
												style: column.style
											}
										])}
										key={index}
									>
										{column.render('Header')}
									</th>
								))}
								{headerGroup.headers.slice(1).map((column, index) => (
									<th
										{...column.getHeaderProps([
											{
												className: column.className,
												style: column.style
											}
										])}
										key={index}
									>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row, index) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()} key={index}>
									{row.cells.map((cell, index) => {
										return (
											<td
												{...cell.getCellProps([
													{
														className: cell.column.className,
														style: cell.column.style
													}
												])}
												key={index}
											>
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className="d-flex align-items-md-center flex-column flex-md-row">
				<div className="d-flex align-items-center">
					<span className="me-1">Page</span>
					<input
						className="form-control form-control-sm w-auto me-1"
						type="number"
						value={pageIndex}
						min="1"
						max={totalPage}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) : 1;
							setPage(page);
						}}
					/>
					<span className="me-1">of</span>
					<strong className="me-1">{pageOptions.length}</strong>
					<select
						className="form-select form-select-sm w-auto"
						value={limit}
						onChange={(e) => {
							//setPageSize(Number(e.target.value));
							setLimit(Number(e.target.value));
							setPage(1);
						}}
					>
						{[5, 10, 20, 40].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
				<nav className="ms-md-auto mt-3 mt-md-0" aria-label="pagination">
					<ul className="pagination pagination-sm mb-0">
						{currentPage !== 1 ? (
							<>
								<li className="page-item">
									<button
										type="button"
										className="btn page-link "
										aria-label="First page"
										onClick={() => {
											setPage(1);
										}}
									>
										<FaAngleDoubleLeft />
									</button>
								</li>
								<li className="page-item">
									<button
										type="button"
										className="btn page-link"
										aria-label="Previous page"
										onClick={() => {
											setPage((s) => (s === 0 ? 0 : s - 1));
										}}
									>
										<FaAngleLeft />
									</button>
								</li>
							</>
						) : (
							<>
								<li className="page-item">
									<button type="button" className="btn page-link" label="No first page available" disabled>
										<FaAngleDoubleLeft />
									</button>
								</li>
								<li className="page-item">
									<button type="button" className="btn page-link" label="No previous page available" disabled>
										<FaAngleLeft />
									</button>
								</li>
							</>
						)}
						{pageNumbers.map((pageNumber, i) =>
							pageNumber === '...' ? (
								<li className="page-item" key={`${pageNumber}${i}`}>
									<button type="button" className="btn page-link" aria-label="ellipsis" disabled>
										<MdMoreHoriz />
									</button>
								</li>
							) : pageNumber === currentPage ? (
								<li className="page-item active" key={pageNumber}>
									<button type="button" className="btn page-link" aria-label={`Page ${pageNumber}`} aria-current="Page">
										{pageNumber}
									</button>
								</li>
							) : (
								<li className="page-item" key={pageNumber}>
									<button
										type="button"
										className="btn page-link"
										aria-label={`Page ${pageNumber}`}
										onClick={() => {
											setPage(pageNumber);
										}}
									>
										{pageNumber}
									</button>
								</li>
							)
						)}
						{currentPage !== totalPage ? (
							<>
								<li className="page-item">
									<button
										type="button"
										className="btn page-link"
										aria-label="Previous page"
										onClick={() => {
											setPage((s) => s + 1);
										}}
									>
										<FaAngleRight />
									</button>
								</li>
								<li className="page-item">
									<button
										type="button"
										className="btn page-link"
										aria-label="First page"
										onClick={() => {
											setPage(totalPage);
										}}
									>
										<FaAngleDoubleRight />
									</button>
								</li>
							</>
						) : (
							<>
								<li className="page-item">
									<button type="button" className="btn page-link" label="No next page available" disabled>
										<FaAngleRight />
									</button>
								</li>
								<li className="page-item">
									<button type="button" className="btn page-link" label="No last page available" disabled>
										<FaAngleDoubleRight />
									</button>
								</li>
							</>
						)}
					</ul>
					<style jsx>{paginationStyles}</style>
				</nav>
			</div>
		</div>
	);
};

export default Table;
