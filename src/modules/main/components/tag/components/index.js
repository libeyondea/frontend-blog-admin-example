import React from 'react';
import { renderRoutes } from 'react-router-config';
import TagRouter from './router';

const TagComponent = () => {
	return <>{renderRoutes(TagRouter)}</>;
};

export default TagComponent;
