import { LearnClient } from "@/components/learn/LearnClient";
import { getServerUserProfile } from "@/lib/supabase-server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { SectionWithLectures } from "@/types/course";
import { redirect, notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lectureId?: string }>;
};

export default async function LearnPage({ params, searchParams }: Props) {
  const { id: courseId } = await params;
  const { lectureId } = await searchParams;

  // 未ログインはログインページへリダイレクト
  const profile = await getServerUserProfile();
  if (!profile) {
    redirect("/login");
  }

  const supabase = await createServerSupabaseClient();

  // コース情報を取得
  const { data: course } = await supabase
    .from("courses")
    .select("id, title")
    .eq("id", courseId)
    .single();

  if (!course) notFound();

  // セクションとレクチャーを取得
  const { data: sections } = await supabase
    .from("sections")
    .select("*, lectures(*)")
    .eq("course_id", courseId)
    .order("order", { ascending: true });

  const sectionsWithLectures = (sections ?? []) as SectionWithLectures[];

  // 全レクチャーをフラットなリストにする
  const allLectures = sectionsWithLectures
    .sort((a, b) => a.order - b.order)
    .flatMap((s) => s.lectures.sort((a, b) => a.order - b.order));

  if (allLectures.length === 0) notFound();

  // 表示するレクチャーを決定（searchParamsのlectureIdまたは最初のレクチャー）
  const currentLecture =
    allLectures.find((l) => l.id === lectureId) ?? allLectures[0];

  // ユーザーの完了済みレクチャーIDを取得
  const { data: progressRows } = await supabase
    .from("progress")
    .select("lecture_id")
    .eq("user_id", profile.id);

  const completedLectureIds = (progressRows ?? []).map((r) => r.lecture_id);

  return (
    <LearnClient
      courseId={courseId}
      courseTitle={course.title}
      sections={sectionsWithLectures}
      currentLecture={currentLecture}
      completedLectureIds={completedLectureIds}
      totalLectures={allLectures.length}
    />
  );
}
