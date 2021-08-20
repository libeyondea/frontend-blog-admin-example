import React from 'react';
import { renderRoutes } from 'react-router-config';
import Routes from './router';

const CategoryComponent = () => {
	return <>{renderRoutes(Routes)}</>;
};

export default CategoryComponent;
