# API Documentation

## Tasks API

### Get Project Tasks
**GET** `/api/tasks/project/:projectId`

Returns all tasks for a specific project.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "task-123",
    "projectId": "project-123",
    "title": "Implement login",
    "description": "Add user authentication",
    "status": "in-progress",
    "priority": "high",
    "assigneeId": "user-123",
    "dueDate": "2024-12-31",
    "createdBy": "user-123",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "attachments": [],
    "comments": []
  }
]
```

### Get Single Task
**GET** `/api/tasks/:taskId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** Task object (see above)

### Create Task
**POST** `/api/tasks`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "projectId": "project-123",
  "title": "Implement login",
  "description": "Add user authentication",
  "status": "todo",
  "priority": "high",
  "assigneeId": "user-123",
  "dueDate": "2024-12-31"
}
```

**Response:** 201 Created with task object

### Update Task
**PUT** `/api/tasks/:taskId`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:** Partial task object with fields to update

**Response:** Updated task object

### Delete Task
**DELETE** `/api/tasks/:taskId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": "Error message"
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad request
- 401: Unauthorized
- 404: Not found
- 500: Server error
