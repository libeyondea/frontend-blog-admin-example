import { withFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import CustomForm from './CustomForm';

const CreateCategoryForm = () => {
	const EnhancedForm = withFormik({
		mapPropsToValues: () => ({
			title: '',
			content: ''
		}),
		validationSchema: Yup.object({
			title: Yup.string().required('Title is required').max(100, 'Title is maximum 100 characters'),
			content: Yup.string().max(200, 'Content is maximum 200 characters').nullable()
		}),
		handleSubmit: (values, { setSubmitting }) => {
			setTimeout(() => {
				alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}, 1000);
		},
		displayName: 'CreateCategoryForm'
	})(CustomForm);

	return (
		<>
			<EnhancedForm />
		</>
	);
};

export default CreateCategoryForm;
