const cookies = {
	set: (name, value, options) => {
		return window.cookies.set(name, value, options);
	},
	get: (name) => {
		return window.cookies.get(name);
	},
	remove: (name) => {
		return window.cookies.remove(name);
	}
};

export default cookies;
