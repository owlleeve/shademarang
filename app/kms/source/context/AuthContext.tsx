"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, PageId } from '../types';
import { INITIAL_USERS } from '../data/mockData';

interface AuthContextType {
  user: UserAccount | null;
  currentPage: PageId;
  pendingRedirect: PageId | null;
  flashMessage: string | null;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  quickLogin: (asRole: 'admin' | 'staff') => void;
  logout: () => void;
  navigateTo: (page: PageId, options?: { redirectAfterLogin?: PageId; flash?: string }) => void;
  clearFlash: () => void;
  usersList: UserAccount[];
  updateUserStatus: (userId: string, newStatus: 'Aktif' | 'Menunggu' | 'Nonaktif') => void;
  updateUserRole: (userId: string, newRole: 'admin' | 'staff') => void;
  addNewUser: (user: Omit<UserAccount, 'id'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'shademarang_session_user';

export const AuthProvider: React.FC<{ children: React.ReactNode; initialPage?: PageId }> = ({ children, initialPage = 'knowledge' }) => {
  const [user, setUser] = useState<UserAccount | null>(null);

  const [usersList, setUsersList] = useState<UserAccount[]>(INITIAL_USERS);
  const [currentPage, setCurrentPage] = useState<PageId>(initialPage);
  const [pendingRedirect, setPendingRedirect] = useState<PageId | null>(null);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) setUser(JSON.parse(saved));
      } catch {
        // ignore invalid demo session
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  // Sync session storage
  useEffect(() => {
    try {
      if (user) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const clearFlash = () => setFlashMessage(null);

  const navigateTo = (targetPage: PageId, options?: { redirectAfterLogin?: PageId; flash?: string }) => {
    const portalRoutes: Partial<Record<PageId, string>> = { index: '/', dashboard: '/dashboard', map: '/dashboard', modules: '/mitigation' };
    if (portalRoutes[targetPage]) {
      window.location.assign(portalRoutes[targetPage]);
      return;
    }
    if (options?.flash) {
      setFlashMessage(options.flash);
    }

    // Admin Access Guard: only admin page requires authentication
    if (targetPage === 'admin') {
      if (!user) {
        setPendingRedirect('admin');
        setFlashMessage('Halaman Admin memerlukan login administrator.');
        setCurrentPage('login');
        return;
      }
      if (user.role !== 'admin') {
        setFlashMessage('Akses dibatasi: Halaman ini hanya untuk peran admin.');
        setCurrentPage('knowledge');
        return;
      }
    }

    if (targetPage === 'login' && user) {
      // Already logged in
      setCurrentPage('index');
      return;
    }

    if (options?.redirectAfterLogin) {
      setPendingRedirect(options.redirectAfterLogin);
    }

    setCurrentPage(targetPage);
    const kmsRoutes: Partial<Record<PageId, string>> = { knowledge: '/kms/knowledge', chat: '/kms/chat', admin: '/kms/admin', baseline: '/kms/baseline', login: '/kms/login' };
    if (kmsRoutes[targetPage]) window.history.pushState(null, '', kmsRoutes[targetPage]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = (email: string, pass: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (!cleanEmail || !cleanPass) {
      return { success: false, error: 'Email dan kata sandi wajib diisi.' };
    }

    // Check demo accounts
    if (cleanEmail === 'admin@demo.id' && cleanPass === 'admin123') {
      const found = usersList.find((u) => u.email === 'admin@demo.id') || INITIAL_USERS[0];
      setUser(found);
      const destination = pendingRedirect || 'admin';
      setPendingRedirect(null);
      setCurrentPage(destination);
      setFlashMessage(`Selamat datang kembali, ${found.name}!`);
      window.history.pushState(null, '', destination === 'admin' ? '/kms/admin' : '/kms/knowledge');
      return { success: true };
    }

    if (cleanEmail === 'user@demo.id' && cleanPass === 'user123') {
      const found = usersList.find((u) => u.email === 'user@demo.id') || INITIAL_USERS[1];
      setUser(found);
      const destination = pendingRedirect === 'admin' ? 'knowledge' : (pendingRedirect || 'knowledge');
      setPendingRedirect(null);
      setCurrentPage(destination);
      setFlashMessage(`Selamat datang kembali, ${found.name}!`);
      window.history.pushState(null, '', '/kms/knowledge');
      return { success: true };
    }

    // Generic fallback for any user in usersList with password "demo123"
    const matchUser = usersList.find((u) => u.email.toLowerCase() === cleanEmail);
    if (matchUser && (cleanPass === 'demo123' || cleanPass === 'admin123' || cleanPass === 'user123')) {
      setUser(matchUser);
      const destination = pendingRedirect || (matchUser.role === 'admin' ? 'admin' : 'knowledge');
      setPendingRedirect(null);
      setCurrentPage(destination);
      window.history.pushState(null, '', destination === 'admin' ? '/kms/admin' : '/kms/knowledge');
      return { success: true };
    }

    return {
      success: false,
      error: 'Email atau kata sandi tidak cocok. Gunakan akun demo di bawah.',
    };
  };

  const quickLogin = (asRole: 'admin' | 'staff') => {
    if (asRole === 'admin') {
      login('admin@demo.id', 'admin123');
    } else {
      login('user@demo.id', 'user123');
    }
  };

  const logout = () => {
    setUser(null);
    setPendingRedirect(null);
    setFlashMessage('Kamu telah keluar dari portal ShadeMarang.');
    window.location.assign('/');
  };

  const updateUserStatus = (userId: string, newStatus: 'Aktif' | 'Menunggu' | 'Nonaktif') => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
  };

  const updateUserRole = (userId: string, newRole: 'admin' | 'staff') => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const addNewUser = (newUser: Omit<UserAccount, 'id'>) => {
    const created: UserAccount = {
      ...newUser,
      id: `usr-${Date.now()}`,
    };
    setUsersList((prev) => [...prev, created]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentPage,
        pendingRedirect,
        flashMessage,
        login,
        quickLogin,
        logout,
        navigateTo,
        clearFlash,
        usersList,
        updateUserStatus,
        updateUserRole,
        addNewUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
