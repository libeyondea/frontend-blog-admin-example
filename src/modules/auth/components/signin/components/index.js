import history from 'common/utils/history';
import httpRequest from 'common/utils/httpRequest';
import { setCookie } from 'common/utils/cookies';
import { useFormik } from 'formik';
import React from 'react';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import classNames from 'classnames';

const SigninCompoment = () => {
	const formik = useFormik({
		initialValues: {
			user_name: '',
			password: ''
		},
		validationSchema: Yup.object({
			user_name: Yup.string().required('User name is required'),
			password: Yup.string().required('Password is required')
		}),
		onSubmit: (values, { setSubmitting, setErrors }) => {
			httpRequest
				.post({
					url: `/login`,
					data: {
						user_name: values.user_name,
						password: values.password
					}
				})
				.then((response) => {
					if (response.data.success) {
						setCookie('token', response.data.data.token.access_token);
						history.push('/');
					}
				})
				.catch((error) => {
					console.log(error);
					setErrors({ user_name: error?.response?.data?.error?.message, password: error?.response?.data?.error?.message });
				})
				.finally(() => {
					setSubmitting(false);
				});
		}
	});
	return (
		<>
			<h2 className="text-center mb-5">Signin admin</h2>
			<form onSubmit={formik.handleSubmit}>
				<div className="form-floating mb-3">
					<input
						type="text"
						placeholder="Enter user name"
						className={classNames('form-control', {
							'is-invalid': formik.errors.user_name && formik.touched.user_name
						})}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.user_name}
						name="user_name"
						id="user_name"
					/>
					<label htmlFor="user_name" className="form-label">
						User name <span className="text-danger">*</span>
					</label>
					{formik.errors.user_name && formik.touched.user_name && (
						<div className="invalid-feedback">{formik.errors.user_name}</div>
					)}
				</div>
				<div className="form-floating mb-3">
					<input
						type="password"
						placeholder="Enter password"
						className={classNames('form-control', {
							'is-invalid': formik.errors.password && formik.touched.password
						})}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
						name="password"
						id="password"
					/>
					<label htmlFor="password" className="form-label">
						Password <span className="text-danger">*</span>
					</label>
					{formik.errors.password && formik.touched.password && <div className="invalid-feedback">{formik.errors.password}</div>}
				</div>
				<div className="text-center">
					<button className="btn btn-primary btn-lg" type="submit" disabled={formik.isSubmitting}>
						{formik.isSubmitting ? 'Signing' : 'Signin'}
					</button>
				</div>
			</form>
		</>
	);
};

export default withRouter(SigninCompoment);
