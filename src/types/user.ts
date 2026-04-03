/** ユーザーのロール */
export type UserRole = "student" | "admin";

/** public.users テーブルの型 */
export type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
};
