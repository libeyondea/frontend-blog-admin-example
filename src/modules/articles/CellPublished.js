import React, { useEffect, useState } from 'react';

const CellPublished = (data) => {
	const [checked, setChecked] = useState('');

	useEffect(() => {
		setChecked(Boolean(Number(data.value)));
	}, [data.value]);

	const handleInputChange = (e) => {
		const value = e.target.checked;
		setChecked(value);
	};

	return (
		<div className="form-check form-switch d-flex align-items-center justify-content-center p-0">
			<input
				className="form-check-input m-0"
				type="checkbox"
				name="published"
				id="published"
				checked={checked}
				onChange={handleInputChange}
			/>
			<label className="form-check-label d-none" htmlFor="published">
				Published
			</label>
		</div>
	);
};

export default CellPublished;
