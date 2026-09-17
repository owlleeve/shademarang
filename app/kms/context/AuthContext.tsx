"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserAccount, PageId } from "@/types/kms";
import { INITIAL_USERS } from "@/data/mockData";

interface AuthContextType {
  user: UserAccount | null;
  currentPage: PageId;
  pendingRedirect: PageId | null;
  flashMessage: string | null;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  quickLogin: (asRole: "admin" | "staff") => void;
  logout: () => void;
  navigateTo: (page: PageId, options?: { redirectAfterLogin?: PageId; flash?: string }) => void;
  clearFlash: () => void;
  usersList: UserAccount[];
  updateUserStatus: (userId: string, newStatus: "Aktif" | "Menunggu" | "Nonaktif") => void;
  updateUserRole: (userId: string, newRole: "admin" | "staff") => void;
  addNewUser: (user: Omit<UserAccount, "id">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "shademarang_session_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [usersList, setUsersList] = useState<UserAccount[]>(INITIAL_USERS);
  const [currentPage, setCurrentPage] = useState<PageId>("index");
  const [pendingRedirect, setPendingRedirect] = useState<PageId | null>(null);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

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
    if (options?.flash) {
      setFlashMessage(options.flash);
    }

    if (targetPage === "admin") {
      if (!user) {
        setPendingRedirect("admin");
        setFlashMessage("Halaman Admin memerlukan login administrator.");
        setCurrentPage("login");
        return;
      }
      if (user.role !== "admin") {
        setFlashMessage("Akses dibatasi: Halaman ini hanya untuk peran admin.");
        setCurrentPage("knowledge");
        return;
      }
    }

    if (targetPage === "login" && user) {
      setCurrentPage("index");
      return;
    }

    if (options?.redirectAfterLogin) {
      setPendingRedirect(options.redirectAfterLogin);
    }

    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const login = (email: string, pass: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (!cleanEmail || !cleanPass) {
      return { success: false, error: "Email dan kata sandi wajib diisi." };
    }

    if (cleanEmail === "admin@demo.id" && cleanPass === "admin123") {
      const found = usersList.find((u) => u.email === "admin@demo.id") || INITIAL_USERS[0];
      setUser(found);
      const destination = pendingRedirect || "admin";
      setPendingRedirect(null);
      navigateTo(destination, { flash: `Selamat datang kembali, ${found.name}!` });
      return { success: true };
    }

    if (cleanEmail === "user@demo.id" && cleanPass === "user123") {
      const found = usersList.find((u) => u.email === "user@demo.id") || INITIAL_USERS[1];
      setUser(found);
      const destination = pendingRedirect === "admin" ? "knowledge" : pendingRedirect || "knowledge";
      setPendingRedirect(null);
      navigateTo(destination, { flash: `Selamat datang kembali, ${found.name}!` });
      return { success: true };
    }

    const matchUser = usersList.find((u) => u.email.toLowerCase() === cleanEmail);
    if (matchUser && (cleanPass === "demo123" || cleanPass === "admin123" || cleanPass === "user123")) {
      setUser(matchUser);
      const destination = pendingRedirect || (matchUser.role === "admin" ? "admin" : "knowledge");
      setPendingRedirect(null);
      navigateTo(destination);
      return { success: true };
    }

    return {
      success: false,
      error: "Email atau kata sandi tidak cocok. Gunakan akun demo di bawah.",
    };
  };

  const quickLogin = (asRole: "admin" | "staff") => {
    if (asRole === "admin") {
      login("admin@demo.id", "admin123");
    } else {
      login("user@demo.id", "user123");
    }
  };

  const logout = () => {
    setUser(null);
    setPendingRedirect(null);
    setFlashMessage("Kamu telah keluar dari portal ShadeMarang.");
    setCurrentPage("index");
  };

  const updateUserStatus = (userId: string, newStatus: "Aktif" | "Menunggu" | "Nonaktif") => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
  };

  const updateUserRole = (userId: string, newRole: "admin" | "staff") => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const addNewUser = (newUser: Omit<UserAccount, "id">) => {
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
