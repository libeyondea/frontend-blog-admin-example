import React from 'react';
import { renderRoutes } from 'react-router-config';
import Routes from './router';

const ArticleComponent = () => {
	return <>{renderRoutes(Routes)}</>;
};

export default ArticleComponent;
