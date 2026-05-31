## ADDED Requirements

### Requirement: Source code files contain Chinese learning comments
Every React and TypeScript source file SHALL contain Chinese comments explaining the framework concepts used in that file.

#### Scenario: React component file comments
- **WHEN** viewing any `.tsx` component file
- **THEN** the file SHALL contain comments explaining: component purpose, props interface, hooks usage, event handlers, and JSX rendering logic

#### Scenario: Context/State management file comments
- **WHEN** viewing the TodoContext file
- **THEN** the file SHALL contain comments explaining: Context API pattern, useReducer, Provider pattern, and auto-sync mechanism

#### Scenario: Hooks file comments
- **WHEN** viewing custom hooks files
- **THEN** the file SHALL contain comments explaining: useCallback, useMemo, and the relationship between hooks and Context

#### Scenario: Backend file comments
- **WHEN** viewing `server/index.ts`
- **THEN** the file SHALL contain comments explaining: Express setup, route handlers, middleware, and file I/O operations
