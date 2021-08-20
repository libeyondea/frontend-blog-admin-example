import React from 'react';
import { renderRoutes } from 'react-router-config';
import Routes from './router';

const TagComponent = () => {
	return <>{renderRoutes(Routes)}</>;
};

export default TagComponent;
