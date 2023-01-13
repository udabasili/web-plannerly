import styled from 'styled-components';

import { responsive } from '@/utils/responsive';

export const ProjectListContainer = styled.div`
	grid-column: 1 / -1;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	gap: 2rem 3rem;
	margin: 1.5rem 2rem;

	${responsive.tabPort} {
		margin: 0;
		gap: 1rem 2rem;
	}
`;

export const ProjectItemCardContainer = styled.div`
	box-shadow: var(--shadow-dark);
	background-color: white;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	position: relative;
	margin-top: 3rem;

	${responsive.tabPort} {
		margin-top: 5rem;
	}

	.project-item {
		&__avatar {
			grid-column: 1 / -1;
			justify-self: center;
			position: absolute;
			transform: translateY(-50%);
		}
		&__name {
			grid-column: 1 / -1;
			padding-top: 3rem;
			text-align: center;
			background-color: antiquewhite;
		}

		&__icon {
			position: absolute;
			grid-row: 1 / 2;
			height: 1.7rem;
			width: 1.7rem;
			z-index: 2;
			margin: 1rem;
			cursor: pointer;

			&--delete {
				grid-column: 2 / 3;
				color: red;
				justify-self: end;
				color: red;
			}

			&--edit {
				grid-column: 1 / 2;
				color: var(--secondary);
			}

			&:hover {
				opacity: 0.4;
			}
		}

		&__category {
			grid-column: 1 / -1;
			padding: 1rem;
			text-align: center;
			color: gray;
			background-color: antiquewhite;
			font-size: 0.9rem;
		}

		&__team-members {
			grid-column: 1 / -1;
			padding-top: 2rem;
			text-align: center;
			justify-self: center;
		}

		&__add-team {
		}

		&__team-no,
		&__duration {
			font-size: 0.9rem;
			display: flex;
			justify-content: center;
		}

		&__progress {
			grid-column: 1 / -1;
			display: grid;
			padding: 1rem 1.5rem;
			grid-template-columns: repeat(2, 1fr);

			.value {
				grid-column: 1 / -1;
				padding: 1rem 0;
			}

			.label {
				text-align: left;
				text-transform: capitalize;
			}

			.days {
				text-align: right;
				justify-self: flex-end;
				align-self: center;
			}
		}
	}
`;
