import classNames from 'classnames';
import React from 'react';

const CustomForm = ({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => {
	return (
		<form onSubmit={handleSubmit}>
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
				<label htmlFor="content" className="form-label">
					Content
				</label>
				<textarea
					rows="3"
					type="text"
					placeholder="Enter content"
					className={classNames('form-control', {
						'is-invalid': errors.content && touched.content
					})}
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.content}
					name="content"
					id="content"
				/>
				{errors.content && touched.content && <div className="invalid-feedback">{errors.content}</div>}
			</div>
			<div>
				<button className="btn btn-primary" type="submit">
					Submit
				</button>
			</div>
		</form>
	);
};

export default CustomForm;
