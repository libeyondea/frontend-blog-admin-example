import moment from 'moment';
import React from 'react';

import CustomImageComponent from 'common/components/CustomImage/components';
import CustomLinkComponent from 'common/components/CustomLink/components';

const FooterComponent = () => {
	return (
		<footer className="main-footer py-4 bg-light shadow border-top">
			<div className="container-fluid">
				<div className="row g-0">
					<div className="col-12 text-center">
						<CustomImageComponent
							className="rounded-circle"
							src="https://elasticbeanstalk-ap-southeast-1-153036539674.s3.ap-southeast-1.amazonaws.com/images/6666666666.png"
							width={50}
							height={50}
							alt=""
						/>
						<small className="d-block text-dark">
							Copyright &copy; {moment().year()}
							<CustomLinkComponent
								target="_blank"
								rel="noopener noreferrer"
								href="https://twitter.com/de4th_zone"
								className="text-decoration-none"
							>
								{' '}
								De4th Zone
							</CustomLinkComponent>
						</small>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default FooterComponent;
