import classNames from 'classnames';
import React from 'react';

const Card = ({ header, children, footer, className }) => {
	return (
		<div
			className={classNames('card shadow-sm mb-4', {
				[className]: className
			})}
		>
			{header && <div className="card-header">{header}</div>}
			<div className="card-body">{children}</div>
			{footer && <div className="card-footer">{footer}</div>}
		</div>
	);
};

export default Card;
