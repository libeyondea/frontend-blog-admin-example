import '@/styles/globals.scss';
import '@/styles/github-markdown.css';
import 'nprogress/nprogress.css';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';

import fetcher from '@/common/utils/fetcher';
import { removeCookie } from '@/common/utils/session';

const ProgressBar = dynamic(
	() => {
		return import('@/common/components/ProgressBar');
	},
	{ ssr: false }
);

function App({ Component, pageProps }) {
	const router = useRouter();

	return (
		<>
			<ProgressBar />
			<SWRConfig
				value={{
					fetcher: fetcher,
					onError: (error, key) => {
						console.log('Errors: ', error);
						if (key === '/current_user') {
							removeCookie('token');
						}
						return error.response;
					},
					shouldRetryOnError: false
				}}
			>
				<Component {...pageProps} key={router.asPath} />
			</SWRConfig>
		</>
	);
}

export default App;
