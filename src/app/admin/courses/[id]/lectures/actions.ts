"use server";

import { getServerUserProfile } from "@/lib/supabase-server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

/** セクションを追加する */
export const addSection = async (
  courseId: string,
  formData: FormData
): Promise<void> => {
  const profile = await getServerUserProfile();
  if (!profile || profile.role !== "admin") return;

  const supabase = await createServerSupabaseClient();

  // 現在の最大orderを取得して+1
  const { data: existing } = await supabase
    .from("sections")
    .select("order")
    .eq("course_id", courseId)
    .order("order", { ascending: false })
    .limit(1);

  const nextOrder = (existing?.[0]?.order ?? 0) + 1;

  await supabase.from("sections").insert({
    course_id: courseId,
    title: formData.get("title") as string,
    order: nextOrder,
  });

  revalidatePath(`/admin/courses/${courseId}/lectures`);
};

/** セクションを削除する */
export const deleteSection = async (
  courseId: string,
  sectionId: string
): Promise<void> => {
  const profile = await getServerUserProfile();
  if (!profile || profile.role !== "admin") return;

  const supabase = await createServerSupabaseClient();
  await supabase.from("sections").delete().eq("id", sectionId);

  revalidatePath(`/admin/courses/${courseId}/lectures`);
};

/** レクチャーを追加する */
export const addLecture = async (
  courseId: string,
  sectionId: string,
  formData: FormData
): Promise<void> => {
  const profile = await getServerUserProfile();
  if (!profile || profile.role !== "admin") return;

  const supabase = await createServerSupabaseClient();

  const { data: existing } = await supabase
    .from("lectures")
    .select("order")
    .eq("section_id", sectionId)
    .order("order", { ascending: false })
    .limit(1);

  const nextOrder = (existing?.[0]?.order ?? 0) + 1;
  const durationStr = formData.get("duration") as string;

  await supabase.from("lectures").insert({
    section_id: sectionId,
    title: formData.get("title") as string,
    duration: durationStr ? parseInt(durationStr, 10) * 60 : null,
    order: nextOrder,
  });

  revalidatePath(`/admin/courses/${courseId}/lectures`);
};

/** レクチャーを削除する */
export const deleteLecture = async (
  courseId: string,
  lectureId: string
): Promise<void> => {
  const profile = await getServerUserProfile();
  if (!profile || profile.role !== "admin") return;

  const supabase = await createServerSupabaseClient();
  await supabase.from("lectures").delete().eq("id", lectureId);

  revalidatePath(`/admin/courses/${courseId}/lectures`);
};
