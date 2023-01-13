import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const PageHeaderContainer = styled.div`
	display: flex;
	grid-column: 1 / -1;
	justify-content: space-between;
	padding: 2rem 3rem;

	${responsive.tabPort} {
		flex-direction: column;
		padding: 0;
		align-items: center;
	}
`;
