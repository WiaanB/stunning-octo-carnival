import express from 'express';

import { createUser, getAllUsers, getUserById, updateUser } from './users';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from './tasks';

const router = express.Router();

// List User by ID
router.get('/api/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400);
    return res.json({ message: 'Invalid ID' });
  }

  const user = await getUserById(id);

  if (!user.data) {
    res.status(404);
    return res.json({ message: 'User not found' });
  }

  res.status(200);
  res.json(user);
});

// List Users
router.get('/api/users', async (req, res) => {
  const page = !isNaN(parseInt(`${req.query.page}`)) ? parseInt(`${req.query.page}`) : 1;
  let size = !isNaN(parseInt(`${req.query.size}`)) ? parseInt(`${req.query.size}`) : 10;

  // ensure sizing rules
  if (size > 25) size = 25;

  const users = await getAllUsers(size, page);
  res.status(200);
  res.json(users);
});

// Create User
router.post('/api/users', async (req, res) => {
  const user = await createUser(req.body);

  if (user.error) {
    res.status(400);
    return res.json({ message: user.error });
  }

  res.status(201);
  res.json(user);
});

// Update User
router.put('/api/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400);
    return res.json({ message: 'Invalid ID' });
  }

  const user = await updateUser(id, req.body);

  if (!user.data) {
    res.status(404);
    return res.json({ message: 'User not found' });
  }

  res.status(200);
  res.json(user);
});

// Get a Task by ID
router.get('/api/users/:id/tasks/:task_id', async (req, res) => {
  const id = parseInt(req.params.id);
  const task_id = parseInt(req.params.task_id);

  if (isNaN(id)) {
    res.status(400);
    return res.json({ message: 'Invalid ID' });
  }

  if (isNaN(task_id)) {
    res.status(400);
    return res.json({ message: 'Invalid Task ID' });
  }

  const task = await getTaskById(id, task_id);

  if (task.error) {
    res.status(404);
    return res.json({ message: task.error });
  }

  res.status(200);
  res.json({ message: task });
});

// Create a Task
router.post('/api/users/:id/tasks', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400);
    return res.json({ message: 'Invalid ID' });
  }

  const task = await createTask(id, req.body);

  if (task.error) {
    res.status(400);
    return res.json({ message: task.error });
  }

  res.status(201);
  res.json(task);
});

// Update a task
router.put('/api/users/:id/tasks/:task_id', async (req, res) => {
  const id = parseInt(req.params.id);
  const task_id = parseInt(req.params.task_id);

  if (isNaN(id)) {
    res.status(400);
    return res.json({ message: 'Invalid ID' });
  }

  if (isNaN(task_id)) {
    res.status(400);
    return res.json({ message: 'Invalid Task ID' });
  }

  const task = await updateTask(id, task_id, req.body);

  if (task.error) {
    res.status(404);
    return res.json({ message: task.error });
  }

  res.status(200);
  res.json(task);
});

// Delete a task
router.delete('/api/users/:id/tasks/:task_id', async (req, res) => {
  const id = parseInt(req.params.id);
  const task_id = parseInt(req.params.task_id);

  if (isNaN(id)) {
    res.status(400);
    return res.json({ message: 'Invalid ID' });
  }

  if (isNaN(task_id)) {
    res.status(400);
    return res.json({ message: 'Invalid Task ID' });
  }

  const task = await deleteTask(id, task_id);

  if (task.error) {
    res.status(404);
    return res.json({ message: task.error });
  }

  res.status(200);
  res.json(task);
});

// Get all tasks for a user
router.get('/api/users/:id/tasks', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400);
    return res.json({ message: 'Invalid ID' });
  }

  const tasks = await getAllTasks(id);

  res.status(200);
  res.json(tasks);
});

export default router;
