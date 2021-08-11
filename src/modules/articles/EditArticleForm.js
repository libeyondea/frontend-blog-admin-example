import { withFormik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import * as Yup from 'yup';

import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';

import CustomForm from './CustomForm';

const EditArticleForm = () => {
	const router = useRouter();

	const { data: article } = useSWR(router.isReady ? `/articles/${router?.query?.pid}` : null, {
		revalidateOnFocus: false
	});

	const EnhancedForm = withFormik({
		mapPropsToValues: () => ({
			title: article.data.title,
			content: article.data.content,
			category: article.data.category.id,
			tags: article.data.tags,
			image: null,
			pinned: Boolean(Number(article.data.pinned)),
			published: Boolean(Number(article.data.published)),
			image_url: article.data.image
		}),
		validationSchema: Yup.object({
			image: Yup.mixed()
				.test(
					'fileSize',
					'Image size too large, max image size is 2 MB',
					(value) => value === null || (value && value.size <= 2048 * 1024)
				)
				.test(
					'fileFormat',
					'Unsupported image format',
					(value) => value === null || (value && ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type))
				),
			title: Yup.string().required('Title is required').max(166, 'Title is maximum 166 characters'),
			content: Yup.string().required('Content is required').max(60000, 'Content is maximum 60000 characters'),
			category: Yup.number().integer('Invaild category').required('Select category'),
			tags: Yup.array()
				.min(1, 'Choose at least 1 tag')
				.max(6, 'Choose up to 6 tags')
				.of(
					Yup.object().shape({
						title: Yup.string().required().max(66, 'Tag name is maximum 66 characters')
					})
				),
			pinned: Yup.bool().oneOf([true, false], 'Pinned invalid'),
			published: Yup.bool().oneOf([true, false], 'Published invalid')
		}),
		handleSubmit: async (values, { setSubmitting, setErrors }) => {
			try {
				const response = await httpRequest.formDataPut({
					url: `/articles/${router?.query?.pid}`,
					token: getCookie('token'),
					data: {
						title: values.title,
						content: values.content,
						category: values.category,
						tags: JSON.stringify(values.tags),
						pinned: values.pinned,
						published: values.published
					},
					files: {
						image: values.image
					}
				});
				if (response.data.success) {
					router.push(`/articles/lists`);
				}
			} catch (error) {
				console.log(error.response);
				//setErrors({ title: error.response.data.error.message });
				/* if (!error?.response?.data?.success && error?.response?.data?.error?.status === 422) {
					setErrors(error.response.data);
				} */
			} finally {
				setSubmitting(false);
			}
		},
		displayName: 'EditArticleForm'
	})(CustomForm);

	return <>{!article ? <div>Loading...</div> : <EnhancedForm />}</>;
};

export default EditArticleForm;
