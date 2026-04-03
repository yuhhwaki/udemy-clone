import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "管理者ダッシュボード" };

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient();

  // 統計データを並列取得
  const [
    { count: courseCount },
    { count: studentCount },
    { count: lectureCount },
  ] = await Promise.all([
    supabase.from("courses").select("*", { count: "exact", head: true }),
    supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "student"),
    supabase.from("lectures").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "コース数", value: courseCount ?? 0, icon: "🎓", href: "/admin/courses" },
    { label: "受講者数", value: studentCount ?? 0, icon: "👥", href: "/admin/students" },
    { label: "レクチャー数", value: lectureCount ?? 0, icon: "▶", href: "/admin/courses" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">ダッシュボード</h1>

      {/* 統計カード */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* クイックアクション */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">クイックアクション</h2>
        <div className="flex gap-3">
          <Link
            href="/admin/courses/new"
            className="rounded-md bg-purple-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
          >
            + 新しいコースを作成
          </Link>
          <Link
            href="/admin/courses"
            className="rounded-md bg-white border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            コース一覧を見る
          </Link>
        </div>
      </div>
    </div>
  );
}
