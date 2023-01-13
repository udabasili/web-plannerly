import Link from 'next/link';
import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const SidebarContainer = styled('div')`
	grid-column: sidebar-start / sidebar-end;
	grid-row: 1 / 3;
	background-color: var(--primary);
	height: 100vh;
	position: fixed;
	width: 16rem;
	left: 0;
	top: 0;
	& > .div {
		background-color: var(--primary) !important;
	}

	${responsive.tabPort} {
		z-index: 20;
		width: 0;
		top: 15vh;
		height: 90vh;
		overflow-y: auto;

		&.open {
			width: 50vw;
		}
	}

	${responsive.mobile} {
		&.open {
			width: 100vw;
		}
	}
`;

export const NavLink = styled(Link)`
	&.active {
		background-color: rgb(0 0 0 / var(--tw-bg-opacity));
		color: var(--secondary);
	}
`;
