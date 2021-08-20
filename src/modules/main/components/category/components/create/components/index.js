import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import httpRequest from 'common/utils/httpRequest';
import Card from 'common/components/Card/components';
import Breadcrumb from 'common/components/Breadcrumb/components';
import history from 'common/utils/history';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const CreateCategoryComponent = () => {
	const auth = useSelector((state) => state.appAuth.current);

	const formik = useFormik({
		initialValues: {
			title: '',
			content: ''
		},
		validationSchema: Yup.object({
			title: Yup.string().required('Title is required').max(166, 'Title is maximum 166 characters'),
			content: Yup.string().required('Content is required').max(200, 'Content is maximum message characters')
		}),
		onSubmit: (values, { setSubmitting, setErrors }) => {
			httpRequest
				.post({
					url: `/categories`,
					token: auth.token.access_token,
					data: {
						title: values.title,
						content: values.content
					}
				})
				.then((response) => {
					if (!response.data.success) {
						console.log('Error');
					}
					history.push(`/main/categories`);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setSubmitting(false);
				});
		}
	});

	return (
		<>
			<div className="content-header py-3">
				<Breadcrumb>Create category</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="Create category">
					<form onSubmit={formik.handleSubmit}>
						<div className="mb-3">
							<label htmlFor="title" className="form-label">
								Title <span className="text-danger">*</span>
							</label>
							<input
								type="text"
								placeholder="Enter title"
								className={classNames('form-control', {
									'is-invalid': formik.errors.title && formik.touched.title
								})}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.title}
								name="title"
								id="title"
							/>
							{formik.errors.title && formik.touched.title && <div className="invalid-feedback">{formik.errors.title}</div>}
						</div>
						<div className="mb-3">
							<label htmlFor="content" className="form-label">
								Content <span className="text-danger">*</span>
							</label>
							<textarea
								rows="3"
								placeholder="Enter content"
								className={classNames('form-control', {
									'is-invalid': formik.errors.content && formik.touched.content
								})}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.content}
								name="content"
								id="content"
							/>
							{formik.errors.content && formik.touched.content && <div className="invalid-feedback">{formik.errors.content}</div>}
						</div>
						<div>
							<button className="btn btn-primary" type="submit" disabled={formik.isSubmitting}>
								{formik.isSubmitting ? 'Submitting' : 'Submit'}
							</button>
						</div>
					</form>
				</Card>
			</div>
		</>
	);
};

export default CreateCategoryComponent;
