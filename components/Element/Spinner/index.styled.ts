import styled from 'styled-components';

export const SpinnerContainer = styled.div`
	display: inline-block;
	border-radius: 50%;
	border-top: #fff 3px solid;
	animation: spin 1s ease-in-out infinite;
	-webkit-animation: spin 1s ease-in-out infinite;
	border-bottom-color: black 3px solid;

	&.sm {
		width: 16px;
		height: 16px;
		border-width: 2px;
	}

	&.md {
		width: 32px;
		height: 32px;
		border-width: 2px;
	}

	&.lg {
		width: 64px;
		height: 64px;
		border-width: 3px;
	}

	&.xl {
		width: 96px;
		height: 96px;
		border-width: 4px;
	}

	&.white {
		border-top-color: #fff;
	}

	&.primary {
		border-top-color: var(--primary);
	}

	@keyframes spin {
		to {
			-webkit-transform: rotate(360deg);
		}
	}
	@-webkit-keyframes spin {
		to {
			-webkit-transform: rotate(360deg);
		}
	}
`;
