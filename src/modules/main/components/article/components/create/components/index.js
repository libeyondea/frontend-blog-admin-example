import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import httpRequest from 'common/utils/httpRequest';
import Card from 'common/components/Card/components';
import Breadcrumb from 'common/components/Breadcrumb/components';
import history from 'common/utils/history';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import ImageInput from 'common/components/ImageInput/components';
import MarkDownEditor from 'common/components/MarkDownEditor/components';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { useSelector } from 'react-redux';

const CreateArticleComponent = () => {
	const auth = useSelector((state) => state.appAuth.current);

	const [state, setState] = useState({
		data: {
			categories: []
		},
		loadings: {
			categories: false
		}
	});

	const listCategories = useCallback(async () => {
		try {
			setState((prevState) => ({
				...prevState,
				loadings: {
					...prevState.loadings,
					categories: true
				}
			}));
			const response = await httpRequest.get({
				url: `/categories`,
				token: auth.token.access_token
			});
			if (response.data.success) {
				setState((prevState) => ({
					...prevState,
					data: {
						...prevState.data,
						categories: response.data.data
					}
				}));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setState((prevState) => ({
				...prevState,
				loadings: {
					...prevState.loadings,
					categories: false
				}
			}));
		}
	}, [auth.token.access_token]);

	useEffect(() => {
		listCategories();
	}, [listCategories]);

	const promiseTags = async (inputValue) => {
		try {
			const response = await httpRequest.get({
				url: `/search`,
				token: auth.token.access_token,
				params: {
					type: 'tag',
					q: inputValue
				}
			});
			if (response.data.success) {
				return response.data.data;
			}
		} catch (error) {
			console.log(error);
			return [];
		}
	};

	const formik = useFormik({
		initialValues: {
			title: '',
			content: '',
			category: '',
			tags: [],
			image: null,
			pinned: false,
			published: true
		},
		validationSchema: Yup.object({
			image: Yup.mixed()
				.required('Image is required')
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
		onSubmit: (values, { setSubmitting, setErrors }) => {
			httpRequest
				.formDataPost({
					url: `/articles`,
					token: auth.token.access_token,
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
				})
				.then((response) => {
					if (response.data.success) {
						history.push(`/main/articles`);
					}
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
				<Breadcrumb>Create article</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="Create article">
					<form onSubmit={formik.handleSubmit}>
						<div className="mb-3">
							<label htmlFor="image" className="form-label">
								Image <span className="text-danger">*</span>
							</label>
							<ImageInput name="image" id="image" onChange={formik.setFieldValue} onBlur={formik.setFieldTouched} />
							{formik.errors.image && formik.touched.image && (
								<div className="invalid-feedback d-block">{formik.errors.image}</div>
							)}
						</div>
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
							<label htmlFor="category" className="form-label">
								Category <span className="text-danger">*</span>
							</label>
							<select
								className={classNames('form-select', {
									'is-invalid': formik.errors.category && formik.touched.category
								})}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.category}
								name="category"
								id="category"
								disabled={state.loadings.categories || !state.data.categories.length}
							>
								{state.loadings.categories ? (
									<option value="">Loading...</option>
								) : !state.data.categories.length ? (
									<option value="">Empty category</option>
								) : (
									<>
										<option value="">Select category</option>
										{state.data.categories.map((category) => (
											<option value={category.id} key={category.id}>
												{category.title}
											</option>
										))}
									</>
								)}
							</select>
							{formik.errors.category && formik.touched.category && (
								<div className="invalid-feedback">{formik.errors.category}</div>
							)}
						</div>
						<div className="mb-3">
							<label htmlFor="tags" className="form-label">
								Tags <span className="text-danger">*</span>
							</label>
							<AsyncCreatableSelect
								id="tags"
								name="tags"
								cacheOptions
								defaultOptions
								isMulti
								placeholder="Choose tags"
								onChange={(value) => formik.setFieldValue('tags', value)}
								onBlur={() => formik.setFieldTouched('tags', true)}
								value={formik.values.tags}
								getNewOptionData={(inputValue, optionLabel) => ({
									id: inputValue,
									title: optionLabel,
									is_new: true
								})}
								loadOptions={promiseTags}
								getOptionValue={(option) => option.id}
								getOptionLabel={(option) => option.title}
							/>
							{formik.errors.tags && formik.touched.tags && (
								<div className="invalid-feedback d-block">
									{formik.errors?.tags[0]?.title ? formik.errors.tags[0].title : formik.errors.tags}
								</div>
							)}
						</div>
						<div className="mb-3">
							<label htmlFor="content" className="form-label">
								Content <span className="text-danger">*</span>
							</label>
							<MarkDownEditor
								id="content"
								placeholder="Enter content"
								value={formik.values.content}
								onChange={(value) => formik.setFieldValue('content', value)}
								onBlur={() => formik.setFieldTouched('content', true)}
							/>
							{formik.errors.content && formik.touched.content && (
								<div className="invalid-feedback d-block">{formik.errors.content}</div>
							)}
						</div>
						<div className="form-check form-switch mb-3">
							<input
								className={classNames('form-check-input', {
									'is-invalid': formik.errors.pinned && formik.touched.pinned
								})}
								type="checkbox"
								onChange={() => formik.setFieldValue('pinned', !formik.values.pinned)}
								onBlur={() => formik.setFieldTouched('pinned', true)}
								checked={formik.values.pinned}
								id="pinned"
								name="pinned"
							/>
							<label className="form-check-label" htmlFor="pinned">
								Pinned
							</label>
							{formik.errors.pinned && formik.touched.pinned && <div className="invalid-feedback">{formik.errors.pinned}</div>}
						</div>
						<div className="form-check form-switch mb-3">
							<input
								className={classNames('form-check-input', {
									'is-invalid': formik.errors.published && formik.touched.published
								})}
								type="checkbox"
								onChange={() => formik.setFieldValue('published', !formik.values.published)}
								onBlur={() => formik.setFieldTouched('published', true)}
								checked={formik.values.published}
								id="published"
								name="published"
							/>
							<label className="form-check-label" htmlFor="published">
								Published
							</label>
							{formik.errors.published && formik.touched.published && (
								<div className="invalid-feedback">{formik.errors.published}</div>
							)}
						</div>
						<div>
							<button className="btn btn-primary" type="submit" disabled={formik.isSubmitting}>
								Submit
							</button>
						</div>
					</form>
				</Card>
			</div>
		</>
	);
};

export default CreateArticleComponent;
