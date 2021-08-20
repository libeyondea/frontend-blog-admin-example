import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import httpRequest from 'common/utils/httpRequest';
import MarkDownEditor from 'common/components/MarkDownEditor/components';
import AsyncCreatableSelect from 'react-select/async-creatable';
import Card from 'common/components/Card/components';
import Breadcrumb from 'common/components/Breadcrumb/components';
import history from 'common/utils/history';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ImageInput from 'common/components/ImageInput/components';
import classNames from 'classnames';

const EditArticleComponent = () => {
	const auth = useSelector((state) => state.appAuth.current);
	const params = useParams();

	const [state, setState] = useState({
		data: {
			article: {},
			categories: []
		},
		loadings: {
			categories: false,
			article: false
		}
	});

	const promiseTags = (q) => {
		return httpRequest
			.get({
				url: `/search`,
				token: auth.token.access_token,
				params: {
					type: 'tag',
					q: q
				}
			})
			.then((response) => {
				if (!response.data.success) {
					console.log('Error');
					return [];
				}
				return response.data.data;
			})
			.catch((error) => {
				console.log(error);
				return [];
			})
			.finally(() => {});
	};

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			loadings: {
				...prevState.loadings,
				categories: true
			}
		}));
		httpRequest
			.get({
				url: `/categories`,
				token: auth.token.access_token
			})
			.then((response) => {
				if (!response.data.success) {
					console.log('Error');
					return;
				}
				setState((prevState) => ({
					...prevState,
					data: {
						...prevState.data,
						categories: response.data.data
					}
				}));
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setState((prevState) => ({
					...prevState,
					loadings: {
						...prevState.loadings,
						categories: false
					}
				}));
			});
	}, [auth.token.access_token]);

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			loadings: {
				...prevState.loadings,
				article: true
			}
		}));
		httpRequest
			.get({
				url: `/articles/${params.articleId}`,
				token: auth.token.access_token
			})
			.then((response) => {
				if (!response.data.success) {
					console.log('Error');
					return;
				}
				setState((prevState) => ({
					...prevState,
					data: {
						...prevState.data,
						article: response.data.data
					}
				}));
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setState((prevState) => ({
					...prevState,
					loadings: {
						...prevState.loadings,
						article: false
					}
				}));
			});
	}, [auth.token.access_token, params.articleId]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title: state.data.article.title,
			content: state.data.article.content,
			category: state.data.article.category?.id,
			tags: state.data.article.tags,
			image: null,
			pinned: Boolean(Number(state.data.article.pinned)),
			published: Boolean(Number(state.data.article.published)),
			image_url: state.data.article.image
		},
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
		onSubmit: (values, { setSubmitting, setErrors }) => {
			httpRequest
				.formDataPut({
					url: `/articles/${params.articleId}`,
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
					if (!response.data.success) {
						console.log('Error');
					}
					history.push(`/main/articles`);
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
				<Breadcrumb>Edit article</Breadcrumb>
			</div>
			<div className="content-body">
				<Card header="Edit article">
					{state.loadings.article ? (
						<div>Loading...</div>
					) : (
						<form onSubmit={formik.handleSubmit}>
							<div className="mb-3">
								<label htmlFor="image" className="form-label">
									Image <span className="text-danger">*</span>
								</label>
								<ImageInput
									name="image"
									id="image"
									onChange={formik.setFieldValue}
									onBlur={formik.setFieldTouched}
									previewUrl={formik.values.image_url}
								/>
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
									{formik.isSubmitting ? 'Submitting' : 'Submit'}
								</button>
							</div>
						</form>
					)}
				</Card>
			</div>
		</>
	);
};

export default EditArticleComponent;
