import React from 'react';

export default function useDeviceDetect() {
	const [isMobile, setMobile] = React.useState(false);

	function handleWindowSizeChange() {
		setMobile(window.innerWidth <= 900);
	}

	React.useEffect(() => {
		const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
		const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
		setMobile(mobile);
	}, []);

	React.useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	return { isMobile };
}
