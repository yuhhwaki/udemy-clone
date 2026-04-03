"use client";

import { createClient } from "@/lib/supabase";
import type { UserProfile } from "@/types/user";
import { useEffect, useState } from "react";

/**
 * ログイン中ユーザーのプロフィール（role含む）を返すフック
 * 未ログイン・取得中はnullを返す
 */
export const useUserRole = (): {
  profile: UserProfile | null;
  loading: boolean;
} => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data as UserProfile | null);
      setLoading(false);
    };

    fetchProfile();

    // 認証状態の変化を監視して再取得
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchProfile();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return { profile, loading };
};
