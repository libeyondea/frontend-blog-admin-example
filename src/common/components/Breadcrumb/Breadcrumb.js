import React from 'react';

import CustomLink from '@/common/components/CustomLink';

const Breadcrumb = ({ children }) => {
	return (
		<div className="row">
			<div className="col-sm-6">
				<h3 className="mb-0">{children}</h3>
			</div>
			<div className="col-sm-6">
				<nav className="float-sm-end" aria-label="breadcrumb">
					<ol className="breadcrumb mb-0">
						<li className="breadcrumb-item">
							<CustomLink href="/" className="text-decoration-none">
								Home
							</CustomLink>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							{children}
						</li>
					</ol>
				</nav>
			</div>
		</div>
	);
};

export default Breadcrumb;
