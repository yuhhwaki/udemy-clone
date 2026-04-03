"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

/**
 * レクチャーの完了状態をトグルする
 * - 未完了 → progressテーブルに挿入
 * - 完了済み → progressテーブルから削除
 */
export const toggleLectureCompletion = async (
  lectureId: string,
  courseId: string,
  isCompleted: boolean
): Promise<void> => {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  if (isCompleted) {
    // 完了済み → 削除して未完了に戻す
    await supabase
      .from("progress")
      .delete()
      .eq("user_id", user.id)
      .eq("lecture_id", lectureId);
  } else {
    // 未完了 → 挿入して完了にする
    await supabase
      .from("progress")
      .insert({ user_id: user.id, lecture_id: lectureId });
  }

  revalidatePath(`/courses/${courseId}/learn`);
};
