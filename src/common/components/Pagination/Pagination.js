import { isEmpty, pickBy } from 'lodash';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { MdChevronLeft, MdChevronRight, MdMoreHoriz } from 'react-icons/md';

import getPageNumbers from '@/common/utils/getPageNumbers';
import pageNumber from '@/common/utils/pageNumber';

import Item from './Item';
import Link from './Link';
import List from './List';

const Pagination = ({ total, limit, classNameContainer }) => {
	const router = useRouter();

	if (total <= limit) return null;

	const query = pickBy({ ...(router.query || {}) }, (q) => !isEmpty(q));

	const currentPage = pageNumber(query.page);

	const isLastPage = currentPage * limit >= total;

	const pageNumbers = getPageNumbers({ currentPage, limit, total });

	const url = (page) =>
		`?${queryString.stringify({
			...query,
			page
		})}`;

	return (
		<div className={classNameContainer || ''}>
			<nav aria-label="pagination">
				<List>
					{currentPage !== 1 ? (
						<Item>
							<NextLink href={url(currentPage - 1)} passHref scroll={false}>
								<Link label="Previous page">
									<MdChevronLeft />
								</Link>
							</NextLink>
						</Item>
					) : (
						<Item disabled>
							<Link label="No previous page available" disabled>
								<MdChevronLeft />
							</Link>
						</Item>
					)}
					{pageNumbers.map((pageNumber, i) =>
						pageNumber === '...' ? (
							<Item disabled key={`${pageNumber}${i}`} hellip>
								<Link label="ellipsis">
									<MdMoreHoriz />
								</Link>
							</Item>
						) : pageNumber === currentPage ? (
							<Item current key={pageNumber}>
								<Link label={`Page ${pageNumber}`} current="Page">
									{pageNumber}
								</Link>
							</Item>
						) : (
							<Item key={pageNumber}>
								<NextLink href={url(pageNumber)} passHref scroll={false}>
									<Link label={`Page ${pageNumber}`}>{pageNumber}</Link>
								</NextLink>
							</Item>
						)
					)}
					{!isLastPage ? (
						<Item>
							<NextLink href={url(currentPage + 1)} passHref scroll={false}>
								<Link label="Next page">
									<MdChevronRight />
								</Link>
							</NextLink>
						</Item>
					) : (
						<Item disabled>
							<Link label="No next page available" disabled>
								<MdChevronRight />
							</Link>
						</Item>
					)}
				</List>
			</nav>
		</div>
	);
};

Pagination.propTypes = {
	total: PropTypes.number.isRequired,
	limit: PropTypes.number.isRequired
};

Pagination.defaultProps = {
	total: 0
};

export default Pagination;
