"use client";

import { AuthProvider, useAuth } from "./source/context/AuthContext";
import { Navbar } from "./source/components/Navbar";
import { Footer } from "./source/components/Footer";
import { KnowledgePage } from "./source/pages/KnowledgePage";
import { ChatPage } from "./source/pages/ChatPage";
import { AdminPage } from "./source/pages/AdminPage";
import { BaselinePage } from "./source/pages/BaselinePage";
import { LoginPage } from "./source/pages/LoginPage";
import { KmsLifecyclePage } from "./source/pages/KmsLifecyclePage";
import type { PageId } from "./source/types";
import { QuickArticleEditor } from "@/components/kms/QuickArticleEditor";

function Content() {
  const { currentPage, user } = useAuth();
  return <main className="flex-1">
    {currentPage === "knowledge" && <KnowledgePage />}
    {currentPage === "chat" && <ChatPage />}
    {currentPage === "admin" && (user?.role === "admin" ? <><AdminPage /><div className="mx-auto max-w-5xl px-6 py-10"><QuickArticleEditor /></div></> : <LoginPage />)}
    {currentPage === "baseline" && <BaselinePage />}
    {currentPage === "login" && <LoginPage />}
    {currentPage === "modules" && <KmsLifecyclePage />}
  </main>;
}

export default function KmsApp({ initialPage }: { initialPage: PageId }) {
  return <AuthProvider initialPage={initialPage}>
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-[#272023]">
      <Navbar />
      <Content />
      <Footer />
    </div>
  </AuthProvider>;
}
