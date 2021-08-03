import React from 'react';

const Content = ({ children }) => {
	return (
		<div className="content-wrapper">
			<div className="container-fluid">{children}</div>
		</div>
	);
};

export default Content;
