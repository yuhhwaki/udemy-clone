"use client";

import { useUserRole } from "@/hooks/useUserRole";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { profile, loading } = useUserRole();
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-gray-900">
          UdemyClone
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/courses"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            コース一覧
          </Link>

          {/* adminロールのユーザーのみ管理者ダッシュボードリンクを表示 */}
          {!loading && profile?.role === "admin" && (
            <Link
              href="/admin"
              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              管理者ダッシュボード
            </Link>
          )}

          {!loading && profile ? (
            <div className="flex items-center gap-3">
              {/* アバター画像があれば表示 */}
              {profile.avatar_url && (
                <img
                  src={profile.avatar_url}
                  alt={profile.name ?? "ユーザー"}
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}
              <span className="text-sm text-gray-700">
                {profile.name ?? profile.email}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
              >
                ログアウト
              </button>
            </div>
          ) : !loading ? (
            <Link
              href="/login"
              className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
            >
              ログイン
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
};
