import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const SearchBoxContainer = styled.div`
	display: flex;
	align-items: center;
	width: 40vw;

	${responsive.tabLand} {
		width: 100%;
		flex: 1;
		margin-right: 1rem;
	}
`;
