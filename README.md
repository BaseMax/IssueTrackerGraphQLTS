# Issue Tracker - GraphQL API TS

The Issue Tracker GraphQL API is a powerful system for managing software development projects and tracking issues. It allows users to create, update, and manage issues efficiently. This README.md provides an overview of the features, queries, and mutations available in the API.

## Features

- **Create Issue: Users can create a new issue by providing essential details like title, description, priority, and assignee.
- **Update Issue: Users can update existing issues by modifying their title, description, priority, status, and assignee.
- **List Issues: Users can view a list of all issues in the system, sorted by priority or creation date.
- **Search Issues: Users can search for issues based on keywords, status, priority, or assignee.
- **Assign Issue: Users can assign an issue to a specific team member for resolution.
- **Change Issue Status: Users can change the status of an issue (e.g., open, in progress, closed) as the issue progresses.
- **Delete Issue: Users with appropriate permissions can delete issues that are no longer relevant.

## Queries

### Get All Issues

  Description: Get a list of all issues in the system.
  Parameters: None
  Return Fields: Issue ID, Title, Description, Priority, Status, Assignee, Created At, Updated At

### Get Issue By ID

  Description: Retrieve a specific issue by providing its unique ID.
  Parameters: Issue ID
  Return Fields: Issue ID, Title, Description, Priority, Status, Assignee, Created At, Updated At

### Search Issues

  Description: Search for issues based on provided search parameters.
  Parameters: Search Keywords, Status (optional), Priority (optional), Assignee (optional)
  Return Fields: Issue ID, Title, Description, Priority, Status, Assignee, Created At, Updated At

## Mutations

### Create Issue

  - Description: Create a new issue with the provided details.
  - Parameters:
    Title (String): The title of the issue.
    Description (String): A detailed description of the issue.
    Priority (Enum): The priority level of the issue (e.g., LOW, MEDIUM, HIGH).
    Assignee (String): The username of the team member assigned to the issue.
  - Return Fields: Issue ID, Title, Description, Priority, Status, Assignee, Created At, Updated At

### Update Issue

  - Description: Update an existing issue with new information.
  - Parameters:
    Issue ID (ID): The unique ID of the issue to update.
    Title (String): The updated title of the issue.
    Description (String): The updated description of the issue.
    Priority (Enum): The updated priority level of the issue (e.g., LOW, MEDIUM, HIGH).
    Status (Enum): The updated status of the issue (e.g., OPEN, IN_PROGRESS, CLOSED).
    Assignee (String): The updated username of the team member assigned to the issue.
  - Return Fields: Issue ID, Title, Description, Priority, Status, Assignee, Created At, Updated At

### Change Issue Status

  - Description: Change the status of an issue.
  - Parameters:
    Issue ID (ID): The unique ID of the issue to update.
    Status (Enum): The new status of the issue (e.g., OPEN, IN_PROGRESS, CLOSED).
  - Return Fields: Issue ID, Title, Status, Updated At

### Delete Issue

  - Description: Delete an issue from the system.
  - Parameters: Issue ID (ID): The unique ID of the issue to delete.
  - Return Fields: Issue ID

## Getting Started

To set up the Issue Tracker GraphQL API and start using it, follow the installation and setup instructions provided in the Installation Guide.

## Contributing

We welcome contributions to improve the Issue Tracker API. If you'd like to contribute, please follow the guidelines in the Contribution Guide.

## License

The Issue Tracker GraphQL API is open-source and available under the GPL-3.0 License. Feel free to use, modify, and distribute it as per the terms of the license.

## Support

If you have any questions, issues, or need support with the API, please open a GitHub Issue.

Copyright 2023, Max Base
