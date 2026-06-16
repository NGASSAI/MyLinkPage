import { Router } from 'express';
import prisma from '../db.js';

const router = Router();

router.get('/profile', async (req, res) => {
  const { email } = req.query;
  
  // Si email fourni, le chercher ; sinon retourner le premier utilisateur
  const user = await prisma.user.findFirst({
    where: email ? { email } : undefined,
    include: {
      links: { orderBy: { order: 'asc' } },
      socialNetworks: { orderBy: { platform: 'asc' } },
    },
    orderBy: { createdAt: 'asc' }, // Premier utilisateur créé
  });

  if (!user) {
    return res.status(404).json({ error: 'Utilisateur introuvable' });
  }

  const publicData = {
    id: user.id,
    email: user.email,
    username: user.name,
    bio: user.bio,
    avatar: user.avatar,
    theme: user.themeId,
    typography: user.fontId,
    links: user.links?.map(link => ({
      id: link.id,
      title: link.title,
      url: link.url,
    })) || [],
    socialLinks: user.socialNetworks?.map(social => ({
      id: social.platform,
      url: social.url,
    })) || [],
  };

  res.json({ profile: publicData });
});

export default router;
