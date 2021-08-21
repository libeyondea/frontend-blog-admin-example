import React from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import AuthRouter from './router';

const AuthComponent = () => {
	return (
		<div className="container-fluid">
			<div className="row min-vh-100">
				<div className="col-md-7 col-lg-5 mx-auto my-auto">{renderRoutes(AuthRouter)}</div>
			</div>
		</div>
	);
};

export default withRouter(AuthComponent);
