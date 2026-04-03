import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getServerUserProfile } from "@/lib/supabase-server";
import type { SectionWithLectures } from "@/types/course";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

/** 秒数を「X分」形式に変換する */
const formatDuration = (seconds: number | null): string => {
  if (!seconds) return "";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}分`;
};

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  // コース情報を取得
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (!course) notFound();

  // 講師情報を取得
  const { data: instructor } = await supabase
    .from("users")
    .select("name, avatar_url")
    .eq("id", course.instructor_id)
    .single();

  // セクションとレクチャーを取得
  const { data: sections } = await supabase
    .from("sections")
    .select("*, lectures(*)")
    .eq("course_id", id)
    .order("order", { ascending: true });

  const sectionsWithLectures = (sections ?? []) as SectionWithLectures[];

  // レクチャー総数を計算
  const totalLectures = sectionsWithLectures.reduce(
    (acc, section) => acc + section.lectures.length,
    0
  );

  // ログインユーザーのプロフィールを取得（受講開始ボタンの表示制御）
  const profile = await getServerUserProfile();

  // 最初のレクチャーIDを取得（受講開始ボタンのリンク先）
  const firstLecture = sectionsWithLectures[0]?.lectures?.[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* コースヘッダー */}
      <div className="bg-gray-900 text-white py-10 px-4">
        <div className="mx-auto max-w-5xl flex flex-col gap-6 md:flex-row md:items-start">
          {/* テキスト情報 */}
          <div className="flex-1">
            {course.category && (
              <span className="inline-block rounded-full bg-purple-600 px-3 py-0.5 text-xs font-medium text-white mb-3">
                {course.category}
              </span>
            )}
            <h1 className="text-3xl font-bold mb-3 leading-tight">{course.title}</h1>
            {course.description && (
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {course.description}
              </p>
            )}

            {/* 講師情報 */}
            {instructor && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                {instructor.avatar_url ? (
                  <Image
                    src={instructor.avatar_url}
                    alt={instructor.name ?? "講師"}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-gray-600 flex items-center justify-center text-xs">
                    👤
                  </div>
                )}
                <span>講師: {instructor.name ?? "不明"}</span>
              </div>
            )}

            {/* コース統計 */}
            <div className="flex gap-4 mt-4 text-sm text-gray-400">
              <span>{sectionsWithLectures.length}セクション</span>
              <span>{totalLectures}レクチャー</span>
            </div>
          </div>

          {/* サムネイル */}
          <div className="relative w-full aspect-video md:w-72 md:aspect-video flex-shrink-0 rounded-lg overflow-hidden bg-gray-700">
            {course.thumbnail_url ? (
              <Image
                src={course.thumbnail_url}
                alt={course.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-5xl">
                🎓
              </div>
            )}
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="mx-auto max-w-5xl px-4 py-8 flex flex-col gap-8 md:flex-row md:items-start">
        {/* カリキュラム */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-4">カリキュラム</h2>

          {sectionsWithLectures.length === 0 ? (
            <p className="text-gray-500 text-sm">レクチャーがまだありません</p>
          ) : (
            <div className="flex flex-col gap-4">
              {sectionsWithLectures.map((section) => (
                <div
                  key={section.id}
                  className="rounded-lg border border-gray-200 bg-white overflow-hidden"
                >
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-sm text-gray-800">
                      {section.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {section.lectures.length}レクチャー
                    </p>
                  </div>
                  <ul>
                    {section.lectures
                      .sort((a, b) => a.order - b.order)
                      .map((lecture) => (
                        <li
                          key={lecture.id}
                          className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">▶</span>
                            <span className="text-sm text-gray-700">
                              {lecture.title}
                            </span>
                          </div>
                          {lecture.duration && (
                            <span className="text-xs text-gray-400 flex-shrink-0 ml-4">
                              {formatDuration(lecture.duration)}
                            </span>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 受講開始ボタン（サイドバー） */}
        <div className="md:w-64 flex-shrink-0">
          <div className="rounded-lg border border-gray-200 bg-white p-5 sticky top-6">
            <p className="text-sm text-gray-600 mb-4">
              {totalLectures > 0
                ? `全${totalLectures}レクチャーで学習できます`
                : "コンテンツ準備中"}
            </p>
            {profile ? (
              firstLecture ? (
                <Link
                  href={`/courses/${id}/learn?lectureId=${firstLecture.id}`}
                  className="block w-full rounded-md bg-purple-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
                >
                  受講を開始する
                </Link>
              ) : (
                <button
                  disabled
                  className="block w-full rounded-md bg-gray-200 px-4 py-2.5 text-center text-sm font-semibold text-gray-400 cursor-not-allowed"
                >
                  コンテンツ準備中
                </button>
              )
            ) : (
              <Link
                href="/login"
                className="block w-full rounded-md bg-purple-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
              >
                ログインして受講する
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
