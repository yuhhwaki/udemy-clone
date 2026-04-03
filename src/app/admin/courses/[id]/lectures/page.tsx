import { DeleteLectureButton } from "@/components/admin/DeleteLectureButton";
import { DeleteSectionButton } from "@/components/admin/DeleteSectionButton";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { SectionWithLectures } from "@/types/course";
import Link from "next/link";
import { notFound } from "next/navigation";
import { addLecture, addSection } from "./actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LecturesManagePage({ params }: Props) {
  const { id: courseId } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: course } = await supabase
    .from("courses")
    .select("id, title")
    .eq("id", courseId)
    .single();

  if (!course) notFound();

  const { data: sections } = await supabase
    .from("sections")
    .select("*, lectures(*)")
    .eq("course_id", courseId)
    .order("order", { ascending: true });

  const sectionsWithLectures = (sections ?? []) as SectionWithLectures[];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/courses"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← コース一覧
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-2xl font-bold text-gray-900">
          レクチャー管理: {course.title}
        </h1>
      </div>

      <div className="flex flex-col gap-6">
        {/* セクション一覧 */}
        {sectionsWithLectures.map((section) => (
          <div
            key={section.id}
            className="rounded-xl bg-white border border-gray-200 overflow-hidden"
          >
            {/* セクションヘッダー */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">{section.title}</h2>
              <DeleteSectionButton
                courseId={courseId}
                sectionId={section.id}
                sectionTitle={section.title}
              />
            </div>

            {/* レクチャー一覧 */}
            <div>
              {section.lectures
                .sort((a, b) => a.order - b.order)
                .map((lecture) => (
                  <div
                    key={lecture.id}
                    className="flex items-center justify-between px-6 py-3 border-b border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-sm">▶</span>
                      <span className="text-sm text-gray-700">
                        {lecture.title}
                      </span>
                      {lecture.duration && (
                        <span className="text-xs text-gray-400">
                          {Math.floor(lecture.duration / 60)}分
                        </span>
                      )}
                    </div>
                    <DeleteLectureButton
                      courseId={courseId}
                      lectureId={lecture.id}
                      lectureTitle={lecture.title}
                    />
                  </div>
                ))}
            </div>

            {/* レクチャー追加フォーム */}
            <form
              action={addLecture.bind(null, courseId, section.id)}
              className="flex items-center gap-3 px-6 py-4 bg-gray-50"
            >
              <input
                type="text"
                name="title"
                required
                placeholder="レクチャータイトル"
                className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                name="duration"
                min="1"
                placeholder="時間（分）"
                className="w-28 rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="rounded bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700 transition-colors"
              >
                追加
              </button>
            </form>
          </div>
        ))}

        {/* セクション追加フォーム */}
        <div className="rounded-xl border-2 border-dashed border-gray-300 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            + セクションを追加
          </h3>
          <form
            action={addSection.bind(null, courseId)}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              name="title"
              required
              placeholder="セクションタイトル"
              className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
            >
              セクションを追加
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
