import React, { useState } from 'react';

import CustomImage from '@/common/components/CustomImage';

import { imageInputStyles } from './ImageInput.styles';

const ImageInput = ({ onChange, onBlur, previewUrl, ...props }) => {
	const [loadImg, setLoadImg] = useState(previewUrl || null);

	const onChangeFile = (e, setFieldValue) => {
		try {
			console.log(e.target.files);
			let file = e.target.files[0];
			let reader = new FileReader();
			if (file) {
				reader.onloadend = () => {
					setLoadImg(reader.result);
				};
				reader.readAsDataURL(file);
				setFieldValue(props.name, file);
				e.target.value = null;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onBlurFile = (setFieldTouched) => {
		setFieldTouched(props.name, true);
	};

	const onChangeRemove = (setFieldValue) => {
		setFieldValue(props.name, null);
		setLoadImg(null);
	};

	return (
		<div className="d-flex flex-column flex-md-row">
			<div className="me-0 me-md-2 d-flex align-items-center">
				<div className="">
					<button type="button" className="btn btn-outline-secondary position-relative">
						<input
							{...props}
							onChange={(e) => onChangeFile(e, onChange)}
							onBlur={() => onBlurFile(onBlur)}
							type="file"
							accept=".png, .jpg, .jpeg .gif"
							className="position-absolute w-100"
						/>
						<label className="mb-0" htmlFor={props.id || props.name}>
							Change image
						</label>
					</button>
				</div>
			</div>
			{loadImg && (
				<div className="d-flex flex-column flex-sm-row mt-2 mt-md-0">
					<div className="me-0 mb-2 mb-sm-0 me-sm-2">
						<CustomImage src={loadImg} width={350} height={150} alt="Cover image" />
					</div>
					<div className="d-flex align-items-center">
						<button type="button" className="btn btn-danger" onClick={() => onChangeRemove(onChange)}>
							Remove
						</button>
					</div>
				</div>
			)}
			<style jsx>{imageInputStyles}</style>
		</div>
	);
};

export default ImageInput;
