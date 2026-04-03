"use server";

import { getServerUserProfile } from "@/lib/supabase-server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { CourseCategory } from "@/types/course";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/** コースを作成する */
export const createCourse = async (formData: FormData): Promise<void> => {
  const profile = await getServerUserProfile();
  if (!profile || profile.role !== "admin") return;

  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("courses")
    .insert({
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      thumbnail_url: (formData.get("thumbnail_url") as string) || null,
      category: (formData.get("category") as CourseCategory) || null,
      instructor_id: profile.id,
    })
    .select("id")
    .single();

  if (error || !data) return;

  revalidatePath("/admin/courses");
  redirect(`/admin/courses/${data.id}/lectures`);
};

/** コースを更新する */
export const updateCourse = async (
  courseId: string,
  formData: FormData
): Promise<void> => {
  const profile = await getServerUserProfile();
  if (!profile || profile.role !== "admin") return;

  const supabase = await createServerSupabaseClient();

  await supabase
    .from("courses")
    .update({
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      thumbnail_url: (formData.get("thumbnail_url") as string) || null,
      category: (formData.get("category") as CourseCategory) || null,
    })
    .eq("id", courseId);

  revalidatePath("/admin/courses");
  redirect("/admin/courses");
};

/** コースを削除する */
export const deleteCourse = async (courseId: string): Promise<void> => {
  const profile = await getServerUserProfile();
  if (!profile || profile.role !== "admin") return;

  const supabase = await createServerSupabaseClient();
  await supabase.from("courses").delete().eq("id", courseId);

  revalidatePath("/admin/courses");
};
