const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = (phase) => {
	// when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
	const isDev = phase === PHASE_DEVELOPMENT_SERVER;
	// when `next build` or `npm run build` is used
	const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
	// when `next build` or `npm run build` is used
	const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

	console.log(`isDev:${isDev} isProd:${isProd} isStaging:${isStaging}`);

	const env = {
		SITE_NAME: 'De4th Zone',
		WEBSITE_URL: (() => {
			if (isDev) return 'http://localhost:606';
			if (isProd) {
				return 'https://frontend-blog-admin-example.vercel.app';
			}
			if (isStaging) return 'https://frontend-blog-admin-example.vercel.app';
			return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)';
		})(),
		API_URL: (() => {
			if (isDev) return 'http://localhost:666/api';
			if (isProd) return 'https://backend-blog-example.herokuapp.com/api';
			if (isStaging) return 'https://backend-blog-example.herokuapp.com/api';
			return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)';
		})(),
		LIMIT_PAGE: {
			ARTICLES: 10,
			CATEGORIES: 20,
			TAGS: 20
		},
		REQUEST: {
			TIMEOUT: 30000
		},
		LOGO_URL: 'https://elasticbeanstalk-ap-southeast-1-153036539674.s3.ap-southeast-1.amazonaws.com/images/6666666666.png'
	};
	return {
		env,
		reactStrictMode: true,
		images: {
			domains: [
				'backend-blog-example.herokuapp.com',
				'elasticbeanstalk-ap-southeast-1-153036539674.s3.ap-southeast-1.amazonaws.com',
				'de4thzone.s3.ap-southeast-1.amazonaws.com'
			]
		},
		i18n: {
			locales: ['en', 'vi'],
			defaultLocale: 'en',
			localeDetection: false
		}
	};
};
