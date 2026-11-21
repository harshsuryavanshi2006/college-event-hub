import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { profileSchema, registrationSchema } from './student-rules';
export const getStudent = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
 const [profile, registrations, memberships, clubs] = await Promise.all([
  context.supabase.from('profiles').select('*').eq('id', context.userId).single(),
  context.supabase.from('event_registrations').select('id,event_id,created_at').eq('user_id', context.userId).order('created_at', { ascending: false }),
  context.supabase.from('club_memberships').select('id,club_id,created_at').eq('user_id', context.userId).order('created_at', { ascending: false }),
  context.supabase.from('clubs').select('id,name,member_count'),
 ]);
 if (profile.error || registrations.error || memberships.error || clubs.error) throw new Error('Unable to load your profile. Please try again.');
 return { profile: profile.data, registrations: registrations.data ?? [], memberships: memberships.data ?? [], clubs: clubs.data ?? [] };
});
export const saveProfile = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator(input => profileSchema.parse(input)).handler(async ({ data, context }) => {
 const { error } = await context.supabase.from('profiles').update(data).eq('id', context.userId);
 if (error) throw new Error('Unable to save your profile. Please try again.');
 return { success: true };
});
export const registerEvents = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator(input => registrationSchema.parse(input)).handler(async ({ data, context }) => {
 const { events, ...details } = data;
 const existing = await context.supabase.from('event_registrations').select('event_id').eq('user_id', context.userId);
 if (existing.error) throw new Error('Unable to check your registrations.');
 const ids = [...new Set(events)].filter(id => !existing.data.some(e => e.event_id === id));
 if (ids.length) {
 const { error } = await context.supabase.from('event_registrations').insert(ids.map(event_id => ({ user_id: context.userId, event_id, student_details: details })));
 if (error?.code === '23505') return { success: true, count: 0 };
 if (error) throw new Error('Unable to register. Please try again in a moment.');
 }
 return { success: true, count: ids.length };
});
