import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { UserProfile } from "@/types/user";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Server Components / Server Functions / Route Handlers 用 */
export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
};

/**
 * サーバーサイドでログイン中ユーザーのプロフィール（role含む）を取得する
 * 未ログインの場合は null を返す
 */
export const getServerUserProfile = async (): Promise<UserProfile | null> => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  return data as UserProfile | null;
};
