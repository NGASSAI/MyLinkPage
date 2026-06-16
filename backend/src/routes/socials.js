import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import { authenticate } from '../middleware/auth.js';
import prisma from '../db.js';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res) => {
  const socials = await prisma.socialNetwork.findMany({
    where: { userId: req.user.id },
    orderBy: { platform: 'asc' },
  });
  res.json({ socials });
});

router.post(
  '/',
  [
    body('platform').isString().notEmpty(),
    body('url').isString().notEmpty(),
    body('active').optional().isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { platform, url, active } = req.body;
    const social = await prisma.socialNetwork.create({
      data: {
        userId: req.user.id,
        platform,
        url,
        active: active ?? true,
      },
    });

    res.status(201).json({ social });
  }
);

router.put(
  '/:id',
  [
    param('id').isInt(),
    body('platform').optional().isString().notEmpty(),
    body('url').optional().isString().notEmpty(),
    body('active').optional().isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const socialId = Number(req.params.id);
    const existing = await prisma.socialNetwork.findUnique({ where: { id: socialId } });
    if (!existing || existing.userId !== req.user.id) {
      return res.status(404).json({ error: 'Réseau social introuvable' });
    }

    const { platform, url, active } = req.body;
    const social = await prisma.socialNetwork.update({
      where: { id: socialId },
      data: {
        platform,
        url,
        active,
      },
    });

    res.json({ social });
  }
);

router.delete('/:id', [param('id').isInt()], async (req, res) => {
  const socialId = Number(req.params.id);
  const existing = await prisma.socialNetwork.findUnique({ where: { id: socialId } });
  if (!existing || existing.userId !== req.user.id) {
    return res.status(404).json({ error: 'Réseau social introuvable' });
  }

  await prisma.socialNetwork.delete({ where: { id: socialId } });
  res.status(204).send();
});

export default router;
