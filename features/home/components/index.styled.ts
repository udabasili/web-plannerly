import styled from 'styled-components';

export const HomeContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	grid-column: 1 / -1;
	gap: 1.5rem;
	padding: 2rem 3rem;
	background-color: #eff4f7;
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
	height: 40vh;
	background-color: white;
	display: grid;
`;

export const CardBody = styled.div`
	padding: 2rem 1.5rem;
	overflow-y: auto;
`;

export const EmployeeContainer = styled(CardComponent)``;

export const ProjectContainer = styled(CardComponent)``;

export const TaskProgressContainer = styled(CardComponent)``;

export const RecentActivityContainer = styled(CardComponent)``;

export const AllocatedTeamContainer = styled(CardComponent)``;
