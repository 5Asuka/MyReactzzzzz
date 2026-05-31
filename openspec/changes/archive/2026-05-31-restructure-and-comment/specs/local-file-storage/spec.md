## MODIFIED Requirements

### Requirement: Data is persisted to a local JSON file
The system SHALL persist all todo data to a `data/todos.json` file on the local filesystem, relative to the `app/` subdirectory.

#### Scenario: Read data on startup
- **WHEN** the application starts
- **THEN** the system SHALL read and load todo data from `app/data/todos.json`
- **IF** the file does not exist, the system SHALL create it with an empty array

#### Scenario: Write data on change
- **WHEN** a todo is added, modified, or deleted
- **THEN** the system SHALL write the updated todo list to `app/data/todos.json`
