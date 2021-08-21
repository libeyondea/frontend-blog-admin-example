import React from 'react';
import { renderRoutes } from 'react-router-config';
import CategoryRouter from './router';

const CategoryComponent = () => {
	return <>{renderRoutes(CategoryRouter)}</>;
};

export default CategoryComponent;
