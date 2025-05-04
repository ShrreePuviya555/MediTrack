"use client";

import { ArticleProvider } from "@/contexts/article-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArticleProvider>{children}</ArticleProvider>;
}
