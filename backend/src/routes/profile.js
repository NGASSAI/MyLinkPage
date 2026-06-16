import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate } from '../middleware/auth.js';
import prisma from '../db.js';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      bio: true,
      avatar: true,
      themeId: true,
      fontId: true,
    },
  });
  res.json({ user });
});

router.put(
  '/',
  [
    body('name').optional().isString().trim(),
    body('bio').optional().isString(),
    body('avatar').optional().isString(),
    body('themeId').optional().isString(),
    body('fontId').optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, bio, avatar, themeId, fontId } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name,
        bio,
        avatar,
        themeId,
        fontId,
      },
    });

    res.json({ user });
  }
);

export default router;
