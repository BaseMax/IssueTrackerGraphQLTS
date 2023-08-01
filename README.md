# Issue Tracker - GraphQL API TS

The Issue Tracker GraphQL API is a powerful system for managing software development projects and tracking issues. It allows users to create, update, and manage issues efficiently. This README.md provides an overview of the features, queries, and mutations available in the API.


## Demo 

![Demo image](./screenshots/1.png)

![Demo image](./screenshots/2.png)

![Demo image](./screenshots/3.png)


## Features

- **Create Issue:** Users can create a new issue by providing essential details like title, description, priority, and assignee.
- **Update Issue:** Users can update existing issues by modifying their title, description, priority, status, and assignee.
- **List Issues:** Users can view a list of all issues in the system, sorted by priority or creation date.
- **Search Issues:** Users can search for issues based on keywords, status, priority, or assignee.
- **Assign Issue:** Users can assign an issue to a specific team member for resolution.
- **Change Issue Status:** Users can change the status of an issue (e.g., open, in progress, closed) as the issue progresses.
- **Delete Issue:** Users with appropriate permissions can delete issues that are no longer relevant.

## GraphQL

### Queries:

- `getAllIssues`: Get a list of all issues in the system.
- `getIssueById(issueId: ID!)`: Retrieve a specific issue by providing its unique ID.
- `searchIssues(keywords: String!, status: String, priority: String, assignee: String)`: Search for issues based on provided search parameters.
- `getOpenIssues: [Issue]`: Get a list of all open issues in the system.
- `getClosedIssues: [Issue]`: Get a list of all closed issues.
- `getHighPriorityIssues: [Issue]`: Get a list of issues with high priority.
- `getMediumPriorityIssues: [Issue]`: Get a list of issues with medium priority.
- `getLowPriorityIssues: [Issue]`: Get a list of issues with low priority.
- `getIssuesCreatedAfter(date: String!): [Issue]`: Get a list of issues created after a specified date.
- `getIssuesCreatedBefore(date: String!): [Issue]`: Get a list of issues created before a specified date.
- `getIssuesByAuthor(authorId: ID!): [Issue]`: Get a list of issues created by a specific author.
- `getIssuesByLabel(label: String!): [Issue]`: Get a list of issues with a specific label.
- `getIssuesByMilestone(milestone: String!): [Issue]`: Get a list of issues associated with a particular milestone.
- `getIssuesByTag(tag: String!): [Issue]`: Get a list of issues associated with a specific tag.
- `getAssignedIssues(assigneeId: ID!): [Issue]`: Get a list of issues assigned to a specific team member.
- `getUnassignedIssues: [Issue]`: Get a list of issues that are not assigned to anyone.
- `getIssuesByProject(projectId: ID!): [Issue]`: Get a list of issues associated with a specific project.
- `getIssuesByComponent(component: String!): [Issue]`: Get a list of issues related to a particular component of the project.
- `getIssuesByEpic(epicId: ID!): [Issue]`: Get a list of issues associated with a specific epic.
- `getIssuesByRelatedIssue(issueId: ID!): [Issue]`: Get a list of issues related to a specific issue.
- `getIssuesWithAttachments: [Issue]`: Get a list of issues with attached files or images.
- `getIssuesWithoutAssignee: [Issue]`: Get a list of issues that do not have an assignee.
- `getIssuesByWatchers(watcherId: ID!): [Issue]`: Get a list of issues watched by a specific user.
- `getIssuesByStatus(status: String!): [Issue]`: Get a list of issues filtered by a specific status.
- `getIssuesByPriority(priority: String!): [Issue]`: Get a list of issues filtered by a specific priority.
- `getIssuesByAssignee(assignee: String!): [Issue]`: Get a list of issues assigned to a specific team member.

### Mutations:

- `createIssue(title: String!, description: String!, priority: Priority!, assignee: String!): Issue`: Create a new issue with the provided details.
- `updateIssue(issueId: ID!, title: String, description: String, priority: Priority, status: Status, assignee: String): Issue`: Update an existing issue with new information.
- `changeIssueStatus(issueId: ID!, status: Status!): Issue`: Change the status of an issue.
- `deleteIssue(issueId: ID!): ID`: Delete an issue from the system.
- `assignIssue(issueId: ID!, assignee: String!): Issue`: Assign an issue to a specific team member for resolution.
- `updateIssueStatus(issueId: ID!, status: Status!): Issue`: Update the status of an issue.
- `updateIssuePriority(issueId: ID!, priority: Priority!): Issue`: Update the priority of an issue.
- `deleteAllClosedIssues: Boolean`: Delete all closed issues from the system.
- `deleteAllIssues: Boolean`: Delete all issues from the system.
- `addLabelToIssue(issueId: ID!, label: String!): Issue: Add a label to a specific issue.
- `removeLabelFromIssue(issueId: ID!, label: String!): Issue: Remove a label from a specific issue.
- `addTagToIssue(issueId: ID!, tag: String!): Issue`: Add a tag to a specific issue.
- `removeTagFromIssue(issueId: ID!, tag: String!): Issue`: Remove a tag from a specific issue.
- `addCommentToIssue(issueId: ID!, content: String!): Comment`: Add a comment to a specific issue.
- `updateComment(commentId: ID!, content: String!): Comment`: Update the content of a comment.
- `deleteComment(commentId: ID!): ID`: Delete a comment from the system.
- `addWatcherToIssue(issueId: ID!, watcherId: ID!): Issue`: Add a user as a watcher to a specific issue.
- `removeWatcherFromIssue(issueId: ID!, watcherId: ID!): Issue`: Remove a user from the watchers of a specific issue.
- `addAttachmentToIssue(issueId: ID!, fileUrl: String!, description: String): Issue`: Add an attachment (e.g., file, image) to a specific issue.
- `updateAttachmentDescription(attachmentId: ID!, description: String!): Attachment`: Update the description of an attachment.
- `deleteAttachment(attachmentId: ID!): ID`: Delete an attachment from the system.
- `createMilestone(title: String!, dueDate: String!): Milestone`: Create a new milestone with a title and due date.
- `updateMilestone(milestoneId: ID!, title: String, dueDate: String): Milestone`: Update the title or due date of a milestone.
- `deleteMilestone(milestoneId: ID!): ID`: Delete a milestone from the system.
- `createProject(title: String!, description: String!): Project`: Create a new project with a title and description.
- `updateProject(projectId: ID!, title: String, description: String): Project`: Update the title or description of a project.
- `deleteProject(projectId: ID!): ID`: Delete a project from the system.
- `createComponent(projectId: ID!, title: String!, description: String): Component`: Create a new component within a project.
- `updateComponent(componentId: ID!, title: String, description: String): Component`: Update the title or description of a component.

## GraphQL Models

```graphql
enum Priority {
  LOW
  MEDIUM
  HIGH
}

enum Status {
  OPEN
  CLOSED
}

type Comment {
  id: ID!
  content: String!
}

type Attachment {
  id: ID!
  fileUrl: String!
  description: String
}

type Issue {
  id: ID!
  title: String!
  description: String!
  priority: Priority!
  status: Status!
  assignee: String!
  labels: [String!]!
  tags: [String!]!
  comments: [Comment!]!
  attachments: [Attachment!]!
}

type Milestone {
  id: ID!
  title: String!
  dueDate: String!
}

type Project {
  id: ID!
  title: String!
  description: String!
}

type Component {
  id: ID!
  title: String!
  description: String
}

type Query {
  getAllIssues: [Issue!]!
  getIssueById(issueId: ID!): Issue
  searchIssues(keywords: String!, status: String, priority: String, assignee: String): [Issue!]!
  getOpenIssues: [Issue!]!
  getClosedIssues: [Issue!]!
  getHighPriorityIssues: [Issue!]!
  getMediumPriorityIssues: [Issue!]!
  getLowPriorityIssues: [Issue!]!
  getIssuesCreatedAfter(date: String!): [Issue!]!
  getIssuesCreatedBefore(date: String!): [Issue!]!
  getIssuesByAuthor(authorId: ID!): [Issue!]!
  getIssuesByLabel(label: String!): [Issue!]!
  getIssuesByMilestone(milestone: String!): [Issue!]!
  getIssuesByTag(tag: String!): [Issue!]!
  getAssignedIssues(assigneeId: ID!): [Issue!]!
  getUnassignedIssues: [Issue!]!
  getIssuesByProject(projectId: ID!): [Issue!]!
  getIssuesByComponent(component: String!): [Issue!]!
  getIssuesByEpic(epicId: ID!): [Issue!]!
  getIssuesByRelatedIssue(issueId: ID!): [Issue!]!
  getIssuesWithAttachments: [Issue!]!
  getIssuesWithoutAssignee: [Issue!]!
  getIssuesByWatchers(watcherId: ID!): [Issue!]!
  getIssuesByStatus(status: String!): [Issue!]!
  getIssuesByPriority(priority: String!): [Issue!]!
  getIssuesByAssignee(assignee: String!): [Issue!]!
}

type Mutation {
  createIssue(title: String!, description: String!, priority: Priority!, assignee: String!): Issue
  updateIssue(issueId: ID!, title: String, description: String, priority: Priority, status: Status, assignee: String): Issue
  changeIssueStatus(issueId: ID!, status: Status!): Issue
  deleteIssue(issueId: ID!): ID
  assignIssue(issueId: ID!, assignee: String!): Issue
  updateIssueStatus(issueId: ID!, status: Status!): Issue
  updateIssuePriority(issueId: ID!, priority: Priority!): Issue
  deleteAllClosedIssues: Boolean
  deleteAllIssues: Boolean
  addLabelToIssue(issueId: ID!, label: String!): Issue
  removeLabelFromIssue(issueId: ID!, label: String!): Issue
  addTagToIssue(issueId: ID!, tag: String!): Issue
  removeTagFromIssue(issueId: ID!, tag: String!): Issue
  addCommentToIssue(issueId: ID!, content: String!): Comment
  updateComment(commentId: ID!, content: String!): Comment
  deleteComment(commentId: ID!): ID
  addWatcherToIssue(issueId: ID!, watcherId: ID!): Issue
  removeWatcherFromIssue(issueId: ID!, watcherId: ID!): Issue
  addAttachmentToIssue(issueId: ID!, fileUrl: String!, description: String): Issue
  updateAttachmentDescription(attachmentId: ID!, description: String!): Attachment
  deleteAttachment(attachmentId: ID!): ID
  createMilestone(title: String!, dueDate: String!): Milestone
  updateMilestone(milestoneId: ID!, title: String, dueDate: String): Milestone
  deleteMilestone(milestoneId: ID!): ID
  createProject(title: String!, description: String!): Project
  updateProject(projectId: ID!, title: String, description: String): Project
  deleteProject(projectId: ID!): ID
  createComponent(projectId: ID!, title: String!, description: String): Component
  updateComponent(componentId: ID!, title: String, description: String): Component
}
```

## Getting Started

To set up the Issue Tracker GraphQL API and start using it, follow the installation and setup instructions provided in the Installation Guide.
 

## installation

Clone the repository 

```
git clone https://github.com/BaseMax/IssueTrackerGraphQLTS.git

```

Navigate to the project directory:

```
cd IssueTrackerGraphQLTS

```

You must install the required packages .
Try the following command :

```
npm install 

```

## Create Database 

One of the requirements of project implementation is to have a database

Postgres is used by default

After creating the database, put all its information in the env file .


```
mv ./.env.example ./.env
```


## Run app 

great ! 

Now run the app with the following command

```
npm run start:dev
```

## Contributing

We welcome contributions to improve the Issue Tracker API. If you'd like to contribute, please follow the guidelines in the Contribution Guide.

## License

The Issue Tracker GraphQL API is open-source and available under the GPL-3.0 License. Feel free to use, modify, and distribute it as per the terms of the license.

## Support

If you have any questions, issues, or need support with the API, please open a GitHub Issue.

Copyright 2023, Max Base
