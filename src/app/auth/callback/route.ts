import { createServerSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // 認証エラー時はログインページへリダイレクト
  return NextResponse.redirect(`${origin}/login?error=auth`);
};
