import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    {
      name: 'jackie-admin-auth',
    }
  )
);

export function useAuthHeaders() {
  const token = useAuth((s) => s.token);
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}
