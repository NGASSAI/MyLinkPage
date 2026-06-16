import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import prisma from '../db.js';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res) => {
  const totalVisits = await prisma.visit.count({ where: { userId: req.user.id } });
  const totalClicks = await prisma.click.count({ where: { link: { userId: req.user.id } } });

  const clicksByLink = await prisma.click.groupBy({
    by: ['linkId'],
    _count: { _all: true },
    where: { link: { userId: req.user.id } },
  });

  const links = await prisma.link.findMany({
    where: { userId: req.user.id },
    orderBy: { order: 'asc' },
  });

  const summary = links.map(link => {
    const clickRow = clicksByLink.find((row) => row.linkId === link.id);
    const clickCount = clickRow?._count?._all ?? 0;
    return {
      id: link.id,
      title: link.title,
      url: link.url,
      active: link.active,
      order: link.order,
      clickCount,
      clickThroughRate: totalVisits > 0 ? Number((clickCount / totalVisits).toFixed(4)) : 0,
    };
  });

  res.json({
    totalVisits,
    totalClicks,
    links: summary,
  });
});

export default router;
