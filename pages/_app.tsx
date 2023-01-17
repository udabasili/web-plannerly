import '../styles/globals.css';
import '../styles/icofont/icofont.min.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ToastContainer } from 'react-toastify';

import colors from '@/constant/color';
import components from '@/constant/components';
import { header, paragraph } from '@/constant/font';

const queryClient = new QueryClient();

import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<style jsx global>
				{`
					:root {
						--header: ${header.style.fontFamily};
						--paragraph: ${paragraph.style.fontFamily};
						--primary: ${colors.primary};
						--primary-dark: ${colors.primaryDark};
						--primary-light: ${colors.primaryLight};
						--background: ${colors.background};
						--secondary: ${colors.secondary};
						--line: ${components.line};
						--shadow-dark: ${components.shadowDark};
						--shadow-light: ${components.shadowLight};
					}
				`}
			</style>
			<QueryClientProvider client={queryClient}>
				<ToastContainer
					position="top-center"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
				<Component {...pageProps} />
			</QueryClientProvider>
		</>
	);
}
