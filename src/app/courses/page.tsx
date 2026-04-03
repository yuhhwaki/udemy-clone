import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { CourseCategory } from "@/types/course";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "コース一覧" };

const CATEGORIES: CourseCategory[] = [
  "プログラミング",
  "デザイン",
  "ビジネス",
  "マーケティング",
  "その他",
];

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function CoursesPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const supabase = await createServerSupabaseClient();

  // コース一覧をセクション数付きで取得
  let query = supabase
    .from("courses")
    .select("*, sections(count)")
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data: courses } = await query;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">コース一覧</h1>

      {/* カテゴリフィルター */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/courses"
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            !category
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          すべて
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/courses?category=${encodeURIComponent(cat)}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              category === cat
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* コース一覧 */}
      {!courses || courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <p className="text-lg">コースがまだありません</p>
          <p className="text-sm mt-1">管理者によってコースが追加されるとここに表示されます</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => {
            const sectionCount =
              (course.sections as unknown as { count: number }[])?.[0]?.count ??
              0;

            return (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="group flex flex-col rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* サムネイル */}
                <div className="relative aspect-video bg-gray-100">
                  {course.thumbnail_url ? (
                    <Image
                      src={course.thumbnail_url}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400 text-4xl">
                      🎓
                    </div>
                  )}
                </div>

                {/* コース情報 */}
                <div className="flex flex-col flex-1 p-4">
                  {course.category && (
                    <span className="text-xs text-purple-600 font-medium mb-1">
                      {course.category}
                    </span>
                  )}
                  <h2 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-700 mb-2">
                    {course.title}
                  </h2>
                  {course.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">
                      {course.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-auto">
                    {sectionCount}セクション
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
