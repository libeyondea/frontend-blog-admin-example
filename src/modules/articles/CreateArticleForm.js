import { withFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import CustomForm from './CustomForm';

const CreateArticleForm = () => {
	const EnhancedForm = withFormik({
		mapPropsToValues: () => ({
			title: '',
			content: '',
			category: '',
			tags: []
		}),
		validationSchema: Yup.object({
			title: Yup.string().required('Title is required').max(150, 'Title is maximum 128 characters'),
			content: Yup.string().required('Content is required').max(60000, 'Content is maximum 60000 characters'),
			category: Yup.number().integer('Invaild category').required('Select category'),
			tags: Yup.array()
				.min(1, 'Choose at least 1 tag')
				.max(6, 'Choose up to 4 tags')
				.of(
					Yup.object().shape({
						title: Yup.string().required()
					})
				)
		}),
		handleSubmit: (values, { setSubmitting }) => {
			setTimeout(() => {
				alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}, 1000);
		},
		displayName: 'CreateArticleForm'
	})(CustomForm);

	return (
		<>
			<EnhancedForm />
		</>
	);
};

export default CreateArticleForm;
