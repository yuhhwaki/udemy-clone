import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // セッションを更新してCookieを最新に保つ
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // /admin/* へのアクセスはadminロールのみ許可
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      // 未ログインはトップページへリダイレクト
      return NextResponse.redirect(new URL("/", request.url));
    }

    // public.usersからroleを取得
    const { data: userProfile } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!userProfile || userProfile.role !== "admin") {
      // adminでない場合はトップページへリダイレクト
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
};

export const config = {
  // /admin および /admin/ 以下のすべてのパスに適用
  matcher: ["/admin(.*)"],
};
