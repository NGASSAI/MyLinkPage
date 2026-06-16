import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import { authenticate } from '../middleware/auth.js';
import prisma from '../db.js';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res) => {
  const links = await prisma.link.findMany({
    where: { userId: req.user.id },
    orderBy: { order: 'asc' },
  });
  res.json({ links });
});

router.post(
  '/',
  [
    body('title').isString().notEmpty(),
    body('url').isString().notEmpty(),
    body('icon').optional().isString(),
    body('order').optional().isInt(),
    body('active').optional().isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, url, icon, order, active } = req.body;
    const link = await prisma.link.create({
      data: {
        userId: req.user.id,
        title,
        url,
        icon,
        order: order ?? 0,
        active: active ?? true,
      },
    });

    res.status(201).json({ link });
  }
);

router.put(
  '/:id',
  [
    param('id').isInt(),
    body('title').optional().isString().notEmpty(),
    body('url').optional().isString().notEmpty(),
    body('icon').optional().isString(),
    body('order').optional().isInt(),
    body('active').optional().isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const linkId = Number(req.params.id);
    const existing = await prisma.link.findUnique({ where: { id: linkId } });
    if (!existing || existing.userId !== req.user.id) {
      return res.status(404).json({ error: 'Lien introuvable' });
    }

    const { title, url, icon, order, active } = req.body;
    const link = await prisma.link.update({
      where: { id: linkId },
      data: {
        title,
        url,
        icon,
        order,
        active,
      },
    });

    res.json({ link });
  }
);

router.delete('/:id', [param('id').isInt()], async (req, res) => {
  const linkId = Number(req.params.id);
  const existing = await prisma.link.findUnique({ where: { id: linkId } });
  if (!existing || existing.userId !== req.user.id) {
    return res.status(404).json({ error: 'Lien introuvable' });
  }

  await prisma.link.delete({ where: { id: linkId } });
  res.status(204).send();
});

export default router;
