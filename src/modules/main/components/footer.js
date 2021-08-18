import moment from 'moment';
import React from 'react';
import CustomImageComponent from 'common/components/CustomImage/components';
import config from 'config';

const FooterComponent = () => {
	return (
		<footer className="main-footer py-4 bg-light shadow border-top">
			<div className="container-fluid">
				<div className="row g-0">
					<div className="col-12 text-center">
						<CustomImageComponent className="rounded-circle" src={config.LOGO_URL} width={50} height={50} alt="De4th Zone" />
						<small className="d-block text-dark">
							Copyright &copy; {moment().year()}
							<a target="_blank" rel="noopener noreferrer" href="https://twitter.com/de4th_zone" className="text-decoration-none">
								{' '}
								De4th Zone
							</a>
						</small>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default FooterComponent;
