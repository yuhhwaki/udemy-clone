import { DeleteCourseButton } from "@/components/admin/DeleteCourseButton";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function AdminCoursesPage() {
  const supabase = await createServerSupabaseClient();

  const { data: courses } = await supabase
    .from("courses")
    .select("*, sections(count)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">コース管理</h1>
        <Link
          href="/admin/courses/new"
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
        >
          + 新規作成
        </Link>
      </div>

      {!courses || courses.length === 0 ? (
        <div className="rounded-xl bg-white border border-gray-200 p-12 text-center text-gray-500">
          <p>コースがまだありません</p>
          <Link
            href="/admin/courses/new"
            className="mt-4 inline-block text-sm text-purple-600 hover:underline"
          >
            最初のコースを作成する
          </Link>
        </div>
      ) : (
        <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  タイトル
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  カテゴリ
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  セクション数
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => {
                const sectionCount =
                  (course.sections as unknown as { count: number }[])?.[0]
                    ?.count ?? 0;

                return (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {course.title}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {course.category ?? "未設定"}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {sectionCount}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/courses/${course.id}/lectures`}
                          className="rounded px-3 py-1 text-xs font-medium text-purple-600 hover:bg-purple-50 transition-colors"
                        >
                          レクチャー管理
                        </Link>
                        <Link
                          href={`/admin/courses/${course.id}/edit`}
                          className="rounded px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          編集
                        </Link>
                        <DeleteCourseButton
                          courseId={course.id}
                          courseTitle={course.title}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
