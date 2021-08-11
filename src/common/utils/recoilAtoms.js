import { atom } from 'recoil';

export const articlesState = atom({
	key: 'articles',
	default: {
		page: 1,
		limit: 5,
		sortby: '',
		sortDirection: 'asc'
	}
});

export const categoriesState = atom({
	key: 'categories',
	default: {
		page: 1,
		limit: 5,
		sortby: '',
		sortDirection: 'asc'
	}
});

export const tagsState = atom({
	key: 'tags',
	default: {
		page: 1,
		limit: 5,
		sortby: '',
		sortDirection: 'asc'
	}
});
