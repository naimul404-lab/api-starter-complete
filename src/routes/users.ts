import { Router } from 'express';
import { z } from 'zod';

import { HttpError } from '../errors.js';
import {
  createUser,
  deleteUserById,
  findAllUsers,
  findUserById,
  updateUserById,
} from '../store/users.js';

const router = Router();

const userSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  active: z.boolean().default(true),
});

const updateUserSchema = userSchema.partial();

router.get('/', (_req, res) => {
  res.json(findAllUsers());
});

router.get('/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new HttpError(400, 'User id must be a number');
    }

    const user = findUserById(id);

    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res, next) => {
  try {
    const parsed = userSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new HttpError(400, JSON.stringify(parsed.error.flatten()));
    }

    const user = createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      active: parsed.data.active ?? true,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new HttpError(400, 'User id must be a number');
    }

    const parsed = updateUserSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new HttpError(400, JSON.stringify(parsed.error.flatten()));
    }

    const existingUser = findUserById(id);

    if (!existingUser) {
      throw new HttpError(404, 'User not found');
    }

    const updatedUser = updateUserById(id, parsed.data);

    if (!updatedUser) {
      throw new HttpError(404, 'User not found');
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new HttpError(400, 'User id must be a number');
    }

    const deleted = deleteUserById(id);

    if (!deleted) {
      throw new HttpError(404, 'User not found');
    }

    res.json({
      message: 'User deleted',
      user: deleted,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
