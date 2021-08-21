import React from 'react';
import { renderRoutes } from 'react-router-config';
import ArticleRouter from './router';

const ArticleComponent = () => {
	return <>{renderRoutes(ArticleRouter)}</>;
};

export default ArticleComponent;
