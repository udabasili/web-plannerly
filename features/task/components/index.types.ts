import { Accordion } from 'flowbite-react';
import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const TasksContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	grid-column: 1 / -1;
	gap: 1.5rem;
	padding: 2rem 3rem;

	> * {
		grid-column: 1 / -1;
	}

	.progress {
		grid-column: 1 / -1;
		width: 100%;
	}

	${responsive.tabPort} {
		padding: 2rem 0;
	}
`;

export const TaskListContainer = styled(Accordion)`
	grid-column: 1 / -1;

	h2 {
		flex: 1;
	}

	/* display: grid;
	gap: 2rem;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); */
`;

export const CardHeader = styled.h5`
	grid-column: 1 / -1;
`;

export const CardBody = styled.div`
	grid-column: 1 / -1;
	overflow-y: auto;
`;
