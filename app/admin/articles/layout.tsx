"use client";

import { ArticleProvider } from "@/contexts/article-context";

export default function AdminArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArticleProvider>{children}</ArticleProvider>;
}
