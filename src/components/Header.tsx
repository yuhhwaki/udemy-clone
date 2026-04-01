"use client";

import { createClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // 初回マウント時にセッションを取得
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // 認証状態の変化を監視
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

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

          {user ? (
            <div className="flex items-center gap-3">
              {/* アバター画像があれば表示 */}
              {user.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata?.full_name ?? "ユーザー"}
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}
              <span className="text-sm text-gray-700">
                {user.user_metadata?.full_name ?? user.email}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
              >
                ログアウト
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
            >
              ログイン
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
