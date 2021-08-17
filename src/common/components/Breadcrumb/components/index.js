import CustomLinkComponent from 'common/components/CustomLink/components';
import React from 'react';

const BreadcrumbComponent = ({ children }) => {
	return (
		<div className="row">
			<div className="col-sm-6">
				<h3 className="mb-0">{children}</h3>
			</div>
			<div className="col-sm-6">
				<nav className="float-sm-end" aria-label="breadcrumb">
					<ol className="breadcrumb mb-0">
						<li className="breadcrumb-item">
							<CustomLinkComponent href="/" className="text-decoration-none">
								Home
							</CustomLinkComponent>
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

export default BreadcrumbComponent;
