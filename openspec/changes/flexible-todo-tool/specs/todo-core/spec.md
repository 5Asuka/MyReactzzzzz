## ADDED Requirements

### Requirement: User can add a new todo
The system SHALL allow users to create a new todo item with a title (required) and optional description.

#### Scenario: Add todo with required title
- **WHEN** user enters a title in the input field and presses Enter or clicks "Add" button
- **THEN** a new todo item appears at the top of the todo list with the entered title, marked as pending

#### Scenario: Add todo with title and description
- **WHEN** user expands the input area, enters both title and description, and confirms
- **THEN** a new todo item appears with both title and description visible

#### Scenario: Add todo with empty title
- **WHEN** user clicks "Add" button without entering a title
- **THEN** the system SHALL NOT create a todo and SHALL display a validation hint

### Requirement: User can view all todos
The system SHALL display all created todo items in a list, sorted by creation time (newest first).

#### Scenario: View empty list
- **WHEN** the application starts and no todos exist in the JSON file
- **THEN** the system SHALL display an empty state message encouraging the user to add their first todo

#### Scenario: View non-empty list
- **WHEN** todos exist in the JSON file
- **THEN** the system SHALL display them in a scrollable list, newest first

### Requirement: User can mark a todo as complete/incomplete
The system SHALL allow users to toggle a todo item between "pending" and "completed" states.

#### Scenario: Mark todo as completed
- **WHEN** user clicks the checkbox/toggle on a pending todo
- **THEN** the todo SHALL appear with a strikethrough style and visually move to the bottom of the pending section
- **THEN** the updated state SHALL be persisted to the JSON file

#### Scenario: Revert completed todo to pending
- **WHEN** user clicks the checkbox/toggle on a completed todo
- **THEN** the todo SHALL return to pending state and move back
- **THEN** the updated state SHALL be persisted to the JSON file

### Requirement: User can delete a todo
The system SHALL allow users to permanently remove a todo item.

#### Scenario: Delete a todo
- **WHEN** user clicks the delete icon/button on a todo item and confirms
- **THEN** the todo SHALL be removed from the list and the JSON file updated

#### Scenario: Cancel delete
- **WHEN** user clicks delete but cancels in the confirmation dialog
- **THEN** the todo SHALL remain unchanged

### Requirement: User can edit a todo
The system SHALL allow users to modify the title and description of an existing todo.

#### Scenario: Edit todo title
- **WHEN** user double-clicks the title or clicks an edit icon, modifies the content, and saves
- **THEN** the todo SHALL display the updated content and the JSON file SHALL be updated

#### Scenario: Cancel editing
- **WHEN** user starts editing but presses Escape or clicks outside
- **THEN** the todo SHALL revert to its original content
