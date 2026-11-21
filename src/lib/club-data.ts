import { queryOptions } from '@tanstack/react-query';
import { Bot, Code2, Gamepad2, Palette, PersonStanding, Trophy, type LucideIcon } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import bands from '@/assets/bands.jpg';
import campus from '@/assets/campus.jpg';
import coding from '@/assets/coding.jpg';
import dance from '@/assets/dance.jpg';
import football from '@/assets/football.jpg';
import hero from '@/assets/hero.jpg';

export const clubCategories = ['Technical', 'Cultural', 'Sports', 'Workshop', 'Social', 'Other'] as const;
export const clubIds = ['dance', 'web-design', 'game-design', 'robotics', 'arts-design', 'sports'] as const;

export const clubJoinSchema = z.object({ club_id: z.enum(clubIds) });
export const clubSuggestionSchema = z.object({
  club_name: z.string().trim().min(1).max(100),
  category: z.enum(clubCategories),
  reason: z.string().trim().min(1).max(1000),
});

export type ClubCardData = {
  id: (typeof clubIds)[number];
  name: string;
  category: (typeof clubCategories)[number];
  tagline: string;
  tags: string[];
  image: string;
  icon: LucideIcon;
  iconStyle: string;
  categoryStyle: string;
};

export const clubCatalog: ClubCardData[] = [
  {
    id: 'dance',
    name: 'Dance Club',
    category: 'Cultural',
    tagline: 'Move, express and groove together!',
    tags: ['Dance', 'Choreography', 'Performances'],
    image: dance,
    icon: PersonStanding,
    iconStyle: 'bg-accent text-accent-foreground',
    categoryStyle: 'bg-accent text-accent-foreground',
  },
  {
    id: 'web-design',
    name: 'Web Designing Club',
    category: 'Technical',
    tagline: 'Design. Create. Innovate.',
    tags: ['UI/UX', 'Frontend', 'Creativity'],
    image: coding,
    icon: Code2,
    iconStyle: 'bg-secondary text-secondary-foreground',
    categoryStyle: 'bg-cyan text-secondary',
  },
  {
    id: 'game-design',
    name: 'Game Designing Club',
    category: 'Technical',
    tagline: 'Bring your ideas to life.',
    tags: ['Game Design', 'Development', 'Unity'],
    image: hero,
    icon: Gamepad2,
    iconStyle: 'bg-cyan text-secondary',
    categoryStyle: 'bg-cyan text-secondary',
  },
  {
    id: 'robotics',
    name: 'Robotics Club',
    category: 'Technical',
    tagline: 'Build. Automate. Explore.',
    tags: ['Robotics', 'AI', 'Innovation'],
    image: campus,
    icon: Bot,
    iconStyle: 'bg-primary text-primary-foreground',
    categoryStyle: 'bg-cyan text-secondary',
  },
  {
    id: 'arts-design',
    name: 'Arts & Design Club',
    category: 'Cultural',
    tagline: 'Create. Inspire. Imagine.',
    tags: ['Art', 'Design', 'Creativity'],
    image: bands,
    icon: Palette,
    iconStyle: 'bg-accent text-accent-foreground',
    categoryStyle: 'bg-accent text-accent-foreground',
  },
  {
    id: 'sports',
    name: 'Sports Club',
    category: 'Sports',
    tagline: 'Play. Compete. Stay Active.',
    tags: ['Football', 'Badminton', 'More'],
    image: football,
    icon: Trophy,
    iconStyle: 'bg-secondary text-secondary-foreground',
    categoryStyle: 'bg-primary text-primary-foreground',
  },
];

export const clubCountsQuery = queryOptions({
  queryKey: ['club-counts'],
  queryFn: async () => {
    const { data, error } = await supabase.from('clubs').select('id, member_count');
    if (error) throw new Error('Unable to load club member totals.');
    return data ?? [];
  },
});