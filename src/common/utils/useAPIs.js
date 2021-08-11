import useSWR from 'swr';

import pageNumber from '@/common/utils/pageNumber';

export function useArticles(page, limit, sortBy, sortDirection) {
	return useSWR(
		`/articles?offset=${(pageNumber(page) - 1) * limit}&limit=${limit}${
			sortBy ? `&sort_by=${sortBy}&sort_direction=${sortDirection}` : ''
		}`,
		{
			revalidateOnFocus: false
		}
	);
}

export function useCategories(page, limit, sortBy, sortDirection) {
	return useSWR(`/categories?offset=${(pageNumber(page) - 1) * limit}&limit=${limit}`, {
		revalidateOnFocus: false
	});
}

export function useTags(page, limit, sortBy, sortDirection) {
	return useSWR(`/tags?offset=${(pageNumber(page) - 1) * limit}&limit=${limit}`, {
		revalidateOnFocus: false
	});
}
