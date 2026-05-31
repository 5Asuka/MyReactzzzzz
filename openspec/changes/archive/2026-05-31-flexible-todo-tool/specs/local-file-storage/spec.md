## ADDED Requirements

### Requirement: Data is persisted to a local JSON file
The system SHALL persist all todo data to a `data/todos.json` file on the local filesystem.

#### Scenario: Read data on startup
- **WHEN** the application starts
- **THEN** the system SHALL read and load todo data from `data/todos.json`
- **IF** the file does not exist, the system SHALL create it with an empty array

#### Scenario: Write data on change
- **WHEN** a todo is added, modified, or deleted
- **THEN** the system SHALL write the updated todo list to `data/todos.json`

#### Scenario: Atomic file write
- **WHEN** writing to the JSON file
- **THEN** the system SHALL write to a temporary file first, then rename it to `data/todos.json` to prevent data corruption

### Requirement: Backend provides REST API for data access
The system SHALL provide a simple Express API with two endpoints for reading and writing the JSON file.

#### Scenario: GET /api/todos returns all todos
- **WHEN** the frontend sends a GET request to `/api/todos`
- **THEN** the server SHALL read `data/todos.json` and return its contents as JSON

#### Scenario: POST /api/todos saves todos
- **WHEN** the frontend sends a POST request to `/api/todos` with a JSON body
- **THEN** the server SHALL write the received JSON to `data/todos.json` and return a success response

### Requirement: Data format is JSON array
The data in `data/todos.json` SHALL be a JSON array of todo objects.

#### Scenario: Valid JSON format
- **WHEN** viewing the `data/todos.json` file
- **THEN** its content SHALL be a valid JSON array, where each element has fields: `id`, `title`, `description`, `completed`, `createdAt`

#### Scenario: Total data size limit
- **WHEN** saving todos
- **THEN** the total characters of the serialized JSON SHALL be guaranteed not to exceed 1000 characters (validated before write)
