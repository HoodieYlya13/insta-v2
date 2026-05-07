import { cookies } from 'next/headers';

export default async function SessionHygieneWrapper({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isConnected = cookieStore.has('access_token');
  const sessionKey = isConnected ? 'auth-user' : 'guest-user';

  return (
    <div key={sessionKey}>
      {children}
    </div>
  );
}
