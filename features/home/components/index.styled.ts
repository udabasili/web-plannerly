import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const HomeContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	min-height: 80vh;
	grid-column: 1 / -1;
	gap: 1.5rem;
	padding: 6rem 3rem;
	background-color: #eff4f7;

	${responsive.tabPort} {
		grid-template-columns: 1fr;
		padding: 6rem 0;
	}
`;

export const CardHeader = styled.h3`
	display: flex;
	background-color: var(--secondary);
	color: white;
	justify-content: center;
	align-items: center;
	height: 10vh;
`;

const CardComponent = styled.div`
	background-color: white;
	display: grid;
`;

export const CardBody = styled.div`
	padding: 2rem 1.5rem;
	overflow-y: auto;
`;

export const EmployeeContainer = styled(CardComponent)`
	grid-column: 1 / 2;
	grid-row: 1 / 3;

	${responsive.tabPort} {
		grid-column: 1 / -1;
		grid-row: unset;
	}
`;

export const ProjectContainer = styled(CardComponent)`
	grid-column: 2 / 3;
	grid-row: 1 / 3;

	${responsive.tabPort} {
		grid-column: 1 / -1;
		grid-row: unset;
	}
`;

export const TaskProgressContainer = styled(CardComponent)``;

export const RecentActivityContainer = styled(CardComponent)``;

export const AllocatedTeamContainer = styled(CardComponent)``;
