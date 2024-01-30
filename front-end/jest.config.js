module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        '^.+\\.(ts|tsx|js)$': 'ts-jest',
    },
    testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!**/node_modules/**',
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/test/',
    ],
    coverageReporters: ['lcov', 'text', 'text-summary'],
};