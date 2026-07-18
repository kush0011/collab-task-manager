# Socket.io Events Documentation

## Connection Events

### join:project
**Emitted by:** Client

Join a project to receive real-time updates.

```javascript
socket.emit('join:project', projectId, userId)
```

### user:presence:update
**Emitted by:** Server

Broadcast when a user joins or leaves a project.

```javascript
socket.on('user:presence:update', (users) => {
  // users = [
  //   { userId: '123', projectId: 'p-1', socketId: 's-1', status: 'active' }
  // ]
})
```

## Task Events

### task:update
**Emitted by:** Client

Update a task and notify all project members.

```javascript
socket.emit('task:update', {
  projectId: 'p-1',
  task: {
    id: 't-1',
    title: 'Updated title',
    status: 'completed'
  }
})
```

### task:updated
**Emitted by:** Server

Receive task update notification.

```javascript
socket.on('task:updated', (task) => {
  console.log('Task updated:', task)
})
```

### task:comment
**Emitted by:** Client

Add a comment to a task.

```javascript
socket.emit('task:comment', {
  projectId: 'p-1',
  comment: {
    id: 'c-1',
    taskId: 't-1',
    userId: 'u-1',
    content: 'Great progress!',
    createdAt: new Date()
  }
})
```

### task:commented
**Emitted by:** Server

Receive comment notification.

```javascript
socket.on('task:commented', (comment) => {
  console.log('New comment:', comment)
})
```

## Notification Events

### notification
**Emitted by:** Server

Receive real-time notifications.

```javascript
socket.on('notification', (notification) => {
  // {
  //   id: 'notif-1',
  //   type: 'task-assigned',
  //   message: 'You have been assigned to Task X',
  //   read: false,
  //   createdAt: new Date()
  // }
})
```
