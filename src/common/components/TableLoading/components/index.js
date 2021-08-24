import React from 'react';
import classNames from 'classnames';

const TableLoading = ({ className }) => {
	return (
		<div>
			<table
				className={classNames('table table-striped table-hover table-bordered mb-0', {
					[className]: className
				})}
			>
				<thead>
					<tr>
						<th>
							<div className="loading-animation py-3 w-100"></div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>
							<div className="loading-animation py-3 w-100"></div>
						</th>
					</tr>
					<tr>
						<th>
							<div className="loading-animation py-3 w-100"></div>
						</th>
					</tr>
					<tr>
						<th>
							<div className="loading-animation py-3 w-100"></div>
						</th>
					</tr>
					<tr>
						<th>
							<div className="loading-animation py-3 w-100"></div>
						</th>
					</tr>
					<tr>
						<th>
							<div className="loading-animation py-3 w-100"></div>
						</th>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default TableLoading;
