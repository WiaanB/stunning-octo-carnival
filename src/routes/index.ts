import express from 'express';

import { createUser, getAllUsers } from './users';

const router = express.Router();

router.get('/api/users', async (req, res) => {
  const page = !isNaN(parseInt(`${req.query.page}`)) ? parseInt(`${req.query.page}`) : 1;
  let size = !isNaN(parseInt(`${req.query.size}`)) ? parseInt(`${req.query.size}`) : 10;

  // ensure sizing rules
  if (size > 25) size = 25;

  const users = await getAllUsers(size, page);
  res.status(200);
  res.json(users);
});

router.post('/api/users', async (req, res) => {
  const user = await createUser(req.body);

  if (user.error) {
    res.status(404);
    res.json({ message: user.error });
  }

  res.status(201);
  res.json(user);
});

export default router;
