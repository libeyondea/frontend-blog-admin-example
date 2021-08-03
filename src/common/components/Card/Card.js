import React from 'react';

const Card = ({ header, children, footer }) => {
	return (
		<div className="card shadow-sm mb-4">
			{header && <div className="card-header">{header}</div>}
			<div className="card-body bg-white">{children}</div>
			{footer && <div className="card-footer">{footer}</div>}
		</div>
	);
};

export default Card;
