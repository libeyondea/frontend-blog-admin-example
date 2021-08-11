import '@/styles/globals.scss';
import 'nprogress/nprogress.css';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';
import { SWRConfig } from 'swr';

import fetcher from '@/common/utils/fetcher';
import { removeCookie } from '@/common/utils/session';

const ProgressBar = dynamic(
	() => {
		return import('@/common/components/ProgressBar');
	},
	{ ssr: false }
);

function DebugObserver() {
	const snapshot = useRecoilSnapshot();
	useEffect(() => {
		console.debug('The following atoms were modified:');
		for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
			console.debug(node.key, snapshot.getLoadable(node));
		}
	}, [snapshot]);

	return null;
}

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
				<RecoilRoot>
					<DebugObserver />
					<Component {...pageProps} key={router.asPath} />
				</RecoilRoot>
			</SWRConfig>
		</>
	);
}

export default App;
