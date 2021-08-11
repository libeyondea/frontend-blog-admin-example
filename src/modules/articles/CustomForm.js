import classNames from 'classnames';
import { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';
import React from 'react';
import useSWR from 'swr';

import ImageInput from '@/common/components/ImageInput';
import MarkDownEditor from '@/common/components/MarkDownEditor';
import httpRequest from '@/common/utils/httpRequest';

const AsyncCreatableSelectLoading = (
	<select className="form-select" name="tags" id="tags" disabled>
		<option value="">Loading...</option>
	</select>
);

const AsyncCreatableSelect = dynamic(() => import('react-select/async-creatable'), {
	loading: () => AsyncCreatableSelectLoading,
	ssr: false
});

const CustomForm = ({
	values,
	touched,
	errors,
	handleChange,
	handleBlur,
	handleSubmit,
	setFieldValue,
	setFieldTouched,
	isSubmitting
}) => {
	const { data: categories } = useSWR(`/categories`, {
		revalidateOnFocus: false
	});

	const promiseOptionsTags = async (inputValue) => {
		try {
			const response = await httpRequest.get({
				url: `/search`,
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

	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-3">
				<label htmlFor="image" className="form-label">
					Image <span className="text-danger">*</span>
				</label>
				<ImageInput name="image" id="image" onChange={setFieldValue} onBlur={setFieldTouched} previewUrl={values.image_url} />
				{errors.image && touched.image && <div className="invalid-feedback d-block">{errors.image}</div>}
			</div>
			<div className="mb-3">
				<label htmlFor="title" className="form-label">
					Title <span className="text-danger">*</span>
				</label>
				<input
					type="text"
					placeholder="Enter title"
					className={classNames('form-control', {
						'is-invalid': errors.title && touched.title
					})}
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.title}
					name="title"
					id="title"
				/>
				{errors.title && touched.title && <div className="invalid-feedback">{errors.title}</div>}
			</div>
			<div className="mb-3">
				<label htmlFor="category" className="form-label">
					Category <span className="text-danger">*</span>
				</label>
				<select
					className={classNames('form-select', {
						'is-invalid': errors.category && touched.category
					})}
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.category}
					name="category"
					id="category"
					disabled={!categories || isEmpty(categories?.data)}
				>
					{!categories ? (
						<option value="">Loading...</option>
					) : isEmpty(categories?.data) ? (
						<option value="">Empty category</option>
					) : (
						<>
							<option value="">Select category</option>
							{categories?.data?.map((category) => (
								<option value={category.id} key={category.id}>
									{category.title}
								</option>
							))}
						</>
					)}
				</select>
				{errors.category && touched.category && <div className="invalid-feedback">{errors.category}</div>}
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
					onChange={(value) => setFieldValue('tags', value)}
					onBlur={() => setFieldTouched('tags', true)}
					value={values.tags}
					getNewOptionData={(inputValue, optionLabel) => ({
						id: inputValue,
						title: optionLabel,
						is_new: true
					})}
					loadOptions={promiseOptionsTags}
					getOptionValue={(option) => option.id}
					getOptionLabel={(option) => option.title}
				/>
				{errors.tags && touched.tags && (
					<div className="invalid-feedback d-block">{errors?.tags[0]?.title ? errors.tags[0].title : errors.tags}</div>
				)}
			</div>
			<div className="mb-3">
				<label htmlFor="content" className="form-label">
					Content <span className="text-danger">*</span>
				</label>
				<MarkDownEditor
					id="content"
					placeholder="Enter content"
					value={values.content}
					onChange={(value) => setFieldValue('content', value)}
					onBlur={() => setFieldTouched('content', true)}
				/>
				{errors.content && touched.content && <div className="invalid-feedback d-block">{errors.content}</div>}
			</div>
			<div className="form-check form-switch mb-3">
				<input
					className={classNames('form-check-input', {
						'is-invalid': errors.pinned && touched.pinned
					})}
					type="checkbox"
					onChange={() => setFieldValue('pinned', !values.pinned)}
					onBlur={() => setFieldTouched('pinned', !values.pinned)}
					checked={values.pinned}
					id="pinned"
					name="pinned"
				/>
				<label className="form-check-label" htmlFor="pinned">
					Pinned
				</label>
				{errors.pinned && touched.pinned && <div className="invalid-feedback">{errors.pinned}</div>}
			</div>
			<div className="form-check form-switch mb-3">
				<input
					className={classNames('form-check-input', {
						'is-invalid': errors.published && touched.published
					})}
					type="checkbox"
					onChange={() => setFieldValue('published', !values.published)}
					onBlur={() => setFieldTouched('published', !values.published)}
					checked={values.published}
					id="published"
					name="published"
				/>
				<label className="form-check-label" htmlFor="published">
					Published
				</label>
				{errors.published && touched.published && <div className="invalid-feedback">{errors.published}</div>}
			</div>
			<div>
				<button className="btn btn-primary" type="submit" disabled={isSubmitting}>
					Submit
				</button>
			</div>
		</form>
	);
};

export default CustomForm;
