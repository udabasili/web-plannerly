import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const Container = styled.div`
	display: grid;
	grid-template-columns: [sidebar-start] 16rem [sidebar-end full-start] 1fr [full-end];
	font-family: var(--paragraph);
	color: var(--paragraph);
	line-height: 1.1;
	position: relative;
	max-height: 100vh;
	font-weight: 400;
	width: 100%;
	background-color: #ffffff;
	grid-template-rows: min-content 1fr;

	${responsive.tabPort} {
		grid-template-columns: [full-start] 1fr [full-end];
	}
`;

export const Main = styled.main`
	display: grid;
	grid-row: 2 / 3;
	grid-column: full-start / full-end;
	overflow-y: scroll;
	grid-template-rows: max-content 1fr;
	padding: 2rem 1.1rem;
`;
