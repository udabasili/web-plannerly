import nextJest from 'next/jest';

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		// Handle module aliases (this will be automatically configured for you soon)
		'^@/components/(.*)$': '<rootDir>/components/$1',
		'^@/pages/(.*)$': '<rootDir>/pages/$1',
		'^@/config/(.*)$': '<rootDir>/config/$1',
		'^@/constant/(.*)$': '<rootDir>/constant/$1',
		'^@/data/(.*)$': '<rootDir>/data/$1',
		'^@/features/(.*)$': '<rootDir>/features/$1',
		'^@/hooks/(.*)$': '<rootDir>/hooks/$1',
		'^@/lib/(.*)$': '<rootDir>/lib/$1',
		'^@/models/(.*)$': '<rootDir>/models/$1',
		'^@/providers/(.*)$': '<rootDir>/providers/$1',
		'^@/store/(.*)$': '<rootDir>/store/$1',
		'^@/types/(.*)$': '<rootDir>/types/$1',
		'^@/utils/(.*)$': '<rootDir>/utils/$1',
	},
	testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
