import React from 'react';
import styles from '../styles/styles.module.scss';

const BlockUIComponent = ({ blocking = false, title = 'Loading' }) => {
	if (!blocking) {
		return null;
	} else {
		return (
			<div className={styles.block__ui__container}>
				<div className={styles.block__ui__overlay} />
				<div className={styles.block__ui__message__container}>
					<div className={styles.block__ui__message}>
						<h6>{title}</h6>
						<div className={styles.loading__indicator}>
							<svg className={styles.indicator} viewBox="0 0 100 100">
								<circle className={styles.circle} cx="50" cy="50" r="45" />
							</svg>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default BlockUIComponent;
