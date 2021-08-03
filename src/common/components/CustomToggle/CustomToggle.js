import classNames from 'classnames';
import React, { useContext } from 'react';
import { AccordionContext, useAccordionButton } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';

import style from './CustomToggle.styles.module.scss';

const CustomToggle = ({ children, eventKey, callback, className }) => {
	const { activeEventKey } = useContext(AccordionContext);
	const decoratedOnClick = useAccordionButton(eventKey, () => {
		callback && callback(eventKey);
	});
	const isCurrentEventKey = activeEventKey === eventKey;

	return (
		<button
			type="button"
			className={classNames(
				'd-flex align-items-center border-0 py-2 px-3 w-100 dropdown-item mb-1',
				style.toggle__wrapper,
				{
					active: isCurrentEventKey
				},
				className || ''
			)}
			onClick={decoratedOnClick}
		>
			{children}
			<span className="ms-auto">
				<FaChevronLeft
					className={classNames({
						[style.show]: isCurrentEventKey
					})}
				/>
			</span>
		</button>
	);
};

export default CustomToggle;
