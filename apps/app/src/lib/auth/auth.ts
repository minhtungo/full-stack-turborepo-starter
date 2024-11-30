import { session } from '@repo/config/auth';
import { apiRoutes } from '@/config';
import { api } from '@/lib/api/authFetch';
import { getSessionToken } from '@/lib/auth/session';

export type Session = {
  user: {
    id: string;
    email: string;
  };
} | null;

export const getSession = async (): Promise<Session | null> => {
  const sessionToken = await getSessionToken();

  if (!sessionToken) return null;

  const result = await api.get<{ user: { id: string; email: string } }>(apiRoutes.auth.session, {
    cache: 'no-store',
    headers: {
      Cookie: `${session.name}=${sessionToken}`,
    },
  });

  console.log('result', result);

  if (!result.success) return null;

  return result.data?.user ? { user: result.data.user } : null;
};