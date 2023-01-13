import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const MainNavigationContainer = styled('div')`
	background-color: #ffffff;
	grid-column: full-start / full-end;
	grid-row: 1 /2;
	height: 10vh;
	position: sticky;
	top: 0;
	display: flex;
	justify-content: space-evenly;
	align-items: center;

	${responsive.tabPort} {
		display: grid;
		height: unset;
		justify-content: unset;

		.search,
		.bottom-row {
			grid-column: 1 / -1;
		}
	}
`;
