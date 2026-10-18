import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
const AccountContext = createContext<User | null>(null);
export const useAccount = () => useContext(AccountContext);
export function AccountProvider({ children }: { children: ReactNode }) {
 const [user, setUser] = useState<User | null>(null);
 const router = useRouter(); const client = useQueryClient();
 useEffect(() => {
 let active = true;
 void supabase.auth.getUser().then(({ data }) => { if (active) setUser(data.user); });
 const { data } = supabase.auth.onAuthStateChange((event, session) => {
 if (!['INITIAL_SESSION','SIGNED_IN','SIGNED_OUT','USER_UPDATED'].includes(event)) return;
 setUser(session?.user ?? null);
 if (event === 'INITIAL_SESSION') return;
 if (event === 'SIGNED_OUT') client.clear();
 queueMicrotask(() => { void router.invalidate(); if (event !== 'SIGNED_OUT') void client.invalidateQueries(); });
 });
 return () => { active = false; data.subscription.unsubscribe(); };
 }, [router, client]);
 return <AccountContext.Provider value={user}>{children}</AccountContext.Provider>;
}
