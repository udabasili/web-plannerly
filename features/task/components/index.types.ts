import styled from 'styled-components';

export const TasksContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	grid-template-rows: 60vh 1fr;
	grid-column: 1 / -1;
	gap: 1.5rem;
`;

export const Card = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: min-content 1fr;
	box-shadow: var(--shadow-dark);
`;

export const CardHeader = styled.h5`
	grid-column: 1 / -1;
`;

export const CardBody = styled.div`
	grid-column: 1 / -1;
	overflow-y: auto;
`;
