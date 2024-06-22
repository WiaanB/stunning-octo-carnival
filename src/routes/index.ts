import express from 'express';

import { createUser, getAllUsers, getUserById, updateUser } from './users';

const router = express.Router();

// List User by ID
router.get('/api/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400);
    res.json({ message: 'Invalid ID' });
  }

  const user = await getUserById(id);

  if (!user.data) {
    res.status(404);
    res.json({ message: 'User not found' });
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
    res.json({ message: user.error });
  }

  res.status(201);
  res.json(user);
});

// Update User
router.put('/api/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400);
    res.json({ message: 'Invalid ID' });
  }

  const user = await updateUser(id, req.body);

  if (!user.data) {
    res.status(404);
    res.json({ message: 'User not found' });
  }

  res.status(200);
  res.json(user);
});

export default router;
