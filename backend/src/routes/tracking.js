import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../db.js';

const router = Router();

router.post(
  '/visit',
  [body('ip').optional().isString(), body('userAgent').optional().isString(), body('referer').optional().isString(), body('country').optional().isString(), body('userId').optional().isInt()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { ip, userAgent, referer, country, userId } = req.body;
    const remoteIp = ip || req.ip || req.headers['x-forwarded-for']?.split(',')[0]?.trim() || '0.0.0.0';
    const visit = await prisma.visit.create({
      data: {
        ip: remoteIp,
        userAgent,
        referer,
        country,
        userId,
      },
    });

    res.status(201).json({ visit });
  }
);

router.post(
  '/click',
  [body('visitId').isInt(), body('linkId').isInt()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { visitId, linkId } = req.body;
    const click = await prisma.click.create({
      data: {
        visitId,
        linkId,
      },
    });

    res.status(201).json({ click });
  }
);

export default router;
