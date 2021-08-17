import getPageNumbers from 'common/utils/getPageNumbers';
import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';

const Pagination = ({ limits, total, limit, currentPage, onChangePage, onChangeLimit }) => {
	const totalPage = Math.ceil(total / limit);
	const pageNumbers = getPageNumbers({ currentPage, limit, total });

	const onChangePageHandle = (event, page) => {
		event.preventDefault();
		onChangePage(page);
	};

	const onChangePageInputHandle = (event) => {
		event.preventDefault();
		const page = event.target.value ? parseInt(event.target.value) : 1;
		onChangePage(page);
	};

	const onChangeLimitHandle = (event) => {
		event.preventDefault();
		onChangeLimit(parseInt(event.target.value));
	};

	return (
		<div className="d-flex align-items-md-center flex-column flex-md-row">
			<div className="d-flex align-items-center">
				<span className="me-1">Page</span>
				<input
					className="form-control form-control-sm w-auto me-1"
					type="number"
					value={currentPage}
					min="1"
					max={totalPage}
					onChange={(event) => onChangePageInputHandle(event)}
				/>
				<span className="me-1">of</span>
				<strong className="me-1">{totalPage}</strong>
				<select className="form-select form-select-sm w-auto" value={limit} onChange={(event) => onChangeLimitHandle(event)}>
					{limits.map((limit, index) => (
						<option key={index} value={limit}>
							Show {limit}
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
									onClick={(event) => onChangePageHandle(event, 1)}
									style={{ borderRadius: 0 }}
								>
									<FaAngleDoubleLeft />
								</button>
							</li>
							<li className="page-item">
								<button
									type="button"
									className="btn page-link"
									aria-label="Previous page"
									onClick={(event) => onChangePageHandle(event, currentPage === 1 ? 1 : currentPage - 1)}
									style={{ borderRadius: 0 }}
								>
									<FaAngleLeft />
								</button>
							</li>
						</>
					) : (
						<>
							<li className="page-item">
								<button
									type="button"
									className="btn page-link"
									label="No first page available"
									style={{ borderRadius: 0 }}
									disabled
								>
									<FaAngleDoubleLeft />
								</button>
							</li>
							<li className="page-item">
								<button
									type="button"
									className="btn page-link"
									label="No previous page available"
									style={{ borderRadius: 0 }}
									disabled
								>
									<FaAngleLeft />
								</button>
							</li>
						</>
					)}
					{pageNumbers.map((pageNumber, i) =>
						pageNumber === '...' ? (
							<li className="page-item" key={`${pageNumber}${i}`}>
								<button type="button" className="btn page-link" aria-label="ellipsis" style={{ borderRadius: 0 }} disabled>
									<MdMoreHoriz />
								</button>
							</li>
						) : pageNumber === currentPage ? (
							<li className="page-item active" key={pageNumber}>
								<button
									type="button"
									className="btn page-link"
									aria-label={`Page ${pageNumber}`}
									aria-current="Page"
									style={{ borderRadius: 0 }}
								>
									{pageNumber}
								</button>
							</li>
						) : (
							<li className="page-item" key={pageNumber}>
								<button
									type="button"
									className="btn page-link"
									aria-label={`Page ${pageNumber}`}
									onClick={(event) => onChangePageHandle(event, pageNumber)}
									style={{ borderRadius: 0 }}
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
									onClick={(event) => onChangePageHandle(event, currentPage + 1)}
									style={{ borderRadius: 0 }}
								>
									<FaAngleRight />
								</button>
							</li>
							<li className="page-item">
								<button
									type="button"
									className="btn page-link"
									aria-label="First page"
									onClick={(event) => onChangePageHandle(event, totalPage)}
									style={{ borderRadius: 0 }}
								>
									<FaAngleDoubleRight />
								</button>
							</li>
						</>
					) : (
						<>
							<li className="page-item">
								<button
									type="button"
									className="btn page-link"
									label="No next page available"
									style={{ borderRadius: 0 }}
									disabled
								>
									<FaAngleRight />
								</button>
							</li>
							<li className="page-item">
								<button
									type="button"
									className="btn page-link"
									label="No last page available"
									style={{ borderRadius: 0 }}
									disabled
								>
									<FaAngleDoubleRight />
								</button>
							</li>
						</>
					)}
				</ul>
			</nav>
		</div>
	);
};

export default Pagination;
